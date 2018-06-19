const { Message } = require("../responses");

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    callback(Message.createText(`Unknown command: ${params[0]}`));
}

module.exports = {
    doAction
};