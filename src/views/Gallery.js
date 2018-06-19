const commandParser = require("./commandParser");
const { HelpAction, ReadAction, OriginalAction, DetailAction, SearchAction, HomeAction, LogoutAction, UnknownAction } = require("../actions");

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
            ReadAction.getHelpMessage(),
            OriginalAction.getHelpMessage(),
            DetailAction.getHelpMessage(userKey),
            SearchAction.getHelpMessage(),
            HomeAction.getHelpMessage(),
            LogoutAction.getHelpMessage(),
        ], callback);
        break;
    case ReadAction.getCommand():
        ReadAction.doAction(userKey, null, callback);
        break;
    case OriginalAction.getCommand():
        OriginalAction.doAction(userKey, null, callback);
        break;
    case DetailAction.getCommand():
        DetailAction.doAction(userKey, cmd.params, callback);
        break;
    case SearchAction.getCommand():
        SearchAction.doAction(userKey, null, callback);
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