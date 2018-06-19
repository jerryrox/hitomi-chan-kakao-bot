const { parse } = require("./commandParser");
const { HelpAction, AuthAction, UnknownAction } = require("../actions");

/**
 * Evaluates message and executes callback with a Message object.
 * @param {string} userKey
 * @param {string} content 
 * @param {(data: Object) => void} callback
 */
function handleMessage(userKey, content, callback) {
    let cmd = parse(content);

    switch(cmd.command) {
    case HelpAction.getCommand():
        HelpAction.doAction(null, [
            HelpAction.getHelpMessage(),
            AuthAction.getHelpMessage()
        ], callback);
        break;
    case AuthAction.getCommand():
        AuthAction.doAction(userKey, cmd.params, callback);
        break;
    default:
        UnknownAction.doAction(null, cmd.command, callback);
        break;
    }
}

module.exports = {
    handleMessage
};