const { Message } = require("../responses");
const { UserAuth } = require("../controllers");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "logout";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Unauthenticates current session.";
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
    UserAuth.removeAuth(userKey);
    callback(Message.createText("Successfully logged out."));
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};