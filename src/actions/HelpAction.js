const { Message } = require("../responses");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "help";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Displays this message.";
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
    callback(Message.createText(params.reduce((a, b) => {
        return `${a}\n\n${b}`;
    })));
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};