const { parse } = require("./commandParser");
const { HelpAction, LogoutAction, LatestAction, DetailAction, SearchAction, ViewAction, UnknownAction } = require("../actions");

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
            LogoutAction.getHelpMessage(),
            LatestAction.getHelpMessage(),
            DetailAction.getHelpMessage(userKey),
            SearchAction.getHelpMessage(),
            ViewAction.getHelpMessage()
        ], callback);
        break;
    case LogoutAction.getCommand():
        LogoutAction.doAction(userKey, null, callback);
        break;
    case LatestAction.getCommand():
        LatestAction.doAction(null, cmd.params, callback);
        break;
    case DetailAction.getCommand():
        DetailAction.doAction(userKey, cmd.params, callback);
        break;
    case SearchAction.getCommand():
        SearchAction.doAction(userKey, null, callback);
        break;
    case ViewAction.getCommand():
        ViewAction.doAction(userKey, cmd.params, callback);
        break;
    default:
        UnknownAction.doAction(null, [cmd.command], callback);
        break;
    }
}

module.exports = {
    handleMessage
};