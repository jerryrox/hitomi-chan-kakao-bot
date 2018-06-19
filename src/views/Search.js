const commandParser = require("./commandParser");
const { HelpAction, LatestAction, QueryAction, ViewAction, DetailAction, HomeAction, LogoutAction, UnknownAction } = require("../actions");

/**
 * Evaluates message and executes callback with a Message object.
 * @param {string} userKey
 * @param {string} content 
 * @param {(data: Object) => void} callback
 */
function handleMessage(userKey, content, callback) {
    let cmd = commandParser.parse(content);
    
    switch(cmd.command) {
    case HelpAction.getCommand():
        HelpAction.doAction(null, [
            HelpAction.getHelpMessage(),
            LatestAction.getHelpMessage(),
            QueryAction.getHelpMessage(),
            ViewAction.getHelpMessage(),
            DetailAction.getHelpMessage(userKey),
            HomeAction.getHelpMessage(),
            LogoutAction.getHelpMessage()
        ], callback);
        break;
    case LatestAction.getCommand():
        LatestAction.doAction(null, cmd.params, callback);
        break;
    case QueryAction.getCommand():
        QueryAction.doAction(null, cmd.params, callback);
        break;
    case ViewAction.getCommand():
        ViewAction.doAction(userKey, cmd.params, callback);
        break;
    case DetailAction.getCommand():
        DetailAction.doAction(userKey, cmd.params, callback);
        break;
    case HomeAction.getCommand():
        HomeAction.doAction(userKey, null, callback);
        break;
    case LogoutAction.getCommand():
        LogoutAction.doAction(userKey, null, callback);
        break;
    default:
        UnknownAction.doAction(null, [cmd.command], callback);
        break;
    }
}

module.exports = {
    handleMessage
};