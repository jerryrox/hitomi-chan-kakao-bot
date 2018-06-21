const { Message } = require("../responses");
const { UserState } = require("../controllers");
const galleryFormatter = require("./help/galleryFormatter");
const { API_THUMB_BIG, VIEW_READ, VIEW_WATCH } = require("../urls");
const { isAnimeType } = require("../utils");

const probe = require("probe-image-size");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "read";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Displays a link to this gallery's reader page.";
}

/**
 * Returns the message to display for help action.
 * @returns {string}
 */
function getHelpMessage() {
    return `"${getCommand()}"\n${getDescription()}`;
}

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    let gallery = UserState.getCurGallery(userKey);
    let thumbUrl = API_THUMB_BIG + gallery.id;


    probe(thumbUrl, (err, result) => {
        if(err) {
            console.log(err)
            callback(Message.createText("Failed to fetch thumbnail info."));
            return;
        }

        // Setup metadata
        let targetUrl;
        let buttonText;
        if(isAnimeType(gallery)) {
            targetUrl = VIEW_WATCH + gallery.id;
            buttonText = "Watch online";
        }
        else {
            targetUrl = VIEW_READ + gallery.id;
            buttonText = "Read online";
        }

        // Return message
        let width = result.width;
        let height = result.height;
        let message = Message.createMessage(
            galleryFormatter.formatReadLink(gallery),
            Message.createPhoto(thumbUrl, width, height),
            Message.createMessageButton(buttonText, targetUrl)
        );
        callback(message);
    });
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};