const { Message } = require("../responses");
const { UserAuth, UserState } = require("../controllers");
const viewTypes = require("../views/viewTypes");
const galleryFormatter = require("./help/galleryFormatter");
const { HITOMI_CHAN_READ, HITOMI_CHAN_THUMB_BIG } = require("../constants");

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
    let thumbUrl = HITOMI_CHAN_THUMB_BIG + gallery.id;
    let readUrl = HITOMI_CHAN_READ + gallery.id;

    probe(thumbUrl, (err, result) => {
        if(err) {
            callback(Message.createText("Failed to fetch thumbnail info."));
            return;
        }

        let width = result.width;
        let height = result.height;
        let message = Message.createMessage(
            galleryFormatter.formatReadLink(gallery),
            Message.createPhoto(thumbUrl, width, height),
            Message.createMessageButton("Read online", readUrl)
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