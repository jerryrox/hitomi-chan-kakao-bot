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
    `));
}

module.exports = {
    handleMessage
};