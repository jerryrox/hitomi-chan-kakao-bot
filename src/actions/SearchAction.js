const { Message } = require("../responses");
const { UserState } = require("../controllers");
const viewTypes = require("../views/viewTypes");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "search";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Displays search interface.";
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
    UserState.setViewType(userKey, viewTypes.search);
    callback(Message.createText("Viewing Search."));
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};