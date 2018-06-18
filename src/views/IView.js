const { Keyboard, Message } = require("../responses");

/**
 * Evaluates message and executes callback with a Message object.
 * @param {string} userKey
 * @param {string} content 
 * @param {(data: Object) => void} callback
 */
function handleMessage(userKey, content, callback) {
    callback(Message.createText(`
        userKey: ${userKey},
        content: ${content}
    `, true));
}

module.exports = {
    handleMessage
};