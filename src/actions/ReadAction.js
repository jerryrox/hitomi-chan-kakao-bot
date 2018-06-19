const { Message } = require("../responses");
const { UserAuth, UserState } = require("../controllers");
const viewTypes = require("../views/viewTypes");
const galleryFormatter = require("./help/galleryFormatter");
const { HITOMI_CHAN_READ, HITOMI_CHAN_THUMB_BIG_META, HITOMI_CHAN_THUMB_BIG } = require("../constants");

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
    let thumbMetaUrl = HITOMI_CHAN_THUMB_BIG_META + gallery.id;

    axios.get(thumbMetaUrl)
        .then(res => {
            const { width, height } = res.data;
            let thumbUrl = HITOMI_CHAN_THUMB_BIG + gallery.id;
            let readUrl = HITOMI_CHAN_READ + gallery.id;

            Message.createMessage({
                ...Message.createText(galleryFormatter.formatReadLink(gallery)),
                ...Message.createPhoto(thumbUrl, width, height),
                ...Message.createMessageButton("Read online", readUrl)
            });
        })
        .catch(err => {
            callback(Message.createText(`Thumbnail metadata was not found for id: ${gallery.id}.`));
        });
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};