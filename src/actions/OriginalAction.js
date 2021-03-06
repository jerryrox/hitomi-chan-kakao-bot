const { Message } = require("../responses");
const { UserState } = require("../controllers");
const axios = require("axios");
const { API_ORIGINAL } = require("../urls");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "original";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Displays original hitomi link of current gallery.";
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
    let originalUrl = API_ORIGINAL + gallery.id;

    axios.get(originalUrl)
        .then(res => {
            callback(Message.createText(res.data.data));
        })
        .catch(err => {
            callback(Message.createText(`Original hitomi link not found for id: ${gallery.id}`));
        });
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};