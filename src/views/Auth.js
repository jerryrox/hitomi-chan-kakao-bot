const { Message, Keyboard } = require("../responses");
const { UserAuth, UserState } = require("../controllers");
const viewTypes = require("./viewTypes");

/**
 * Evaluates message and executes callback with a Message object.
 * @param {string} userKey
 * @param {string} content 
 * @param {(data: Object) => void} callback
 */
function handleMessage(userKey, content, callback) {
    let words = content.split(" ");

    switch(words[0]) {
    case "help":
        handleHelp(callback);
        break;
    case "auth":
        handleAuth(userKey, words[1], callback);
        break;
    default:
        handleUnknown(words[0], callback);
        break;
    }
}

function handleUnknown(command, callback) {
    callback(Message.createText(`Unknown command: ${command}`));
}

function handleHelp(callback) {
    callback(Message.createText(`
"help"
Displays this message.

"auth {credential}"
Authenticates current user with specified credential value.
    `));
}

function handleAuth(userKey, credential, callback) {
    if(UserAuth.authenticate(userKey, credential)) {
        UserState.setViewType(userKey, viewTypes.home);
        callback(Message.createText("You are now authenticated! :D"));
        return;
    }
    callback(Message.createText("Failed to authenticate."));
}



module.exports = {
    handleMessage
};