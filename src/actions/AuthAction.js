const { Message } = require("../responses");
const { UserAuth, UserState } = require("../controllers");
const viewTypes = require("../views/viewTypes");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "auth";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Authenticates current user with specified credential value.";
}

/**
 * Returns the message to display for help action.
 * @returns {string}
 */
function getHelpMessage() {
    return `"${getCommand()} {credential}"\n${getDescription()}`;
}

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    if(UserAuth.authenticate(userKey, params[0])) {
        UserState.setViewType(userKey, viewTypes.home);
        callback(Message.createText("You are now authenticated! :D"));
        return;
    }
    callback(Message.createText("Failed to authenticate."));
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};