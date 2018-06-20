const { Message } = require("../responses");
const axios = require("axios");
const urls = require("../urls");
const galleryFormatter = require("./help/galleryFormatter");
const queryBuilder = require("./help/queryBuilder");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "latest";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Returns the latest {count} galleries. (Default: 10)";
}

/**
 * Returns the message to display for help action.
 * @returns {string}
 */
function getHelpMessage() {
    return `"${getCommand()} {count (optional)}"\n${getDescription()}`;
}

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    let count = 10;
    if(params.length > 0) {
        let parsedCount = parseInt(params[0]);
        if(!isNaN(parsedCount))
            count = parsedCount;
    }
    
    let query = queryBuilder.buildQuery({count});
    axios.get(urls.API_GALLERY + query)
        .then(res => {
            callback(Message.createText(
                galleryFormatter.formatSimple(res.data.data)
            ));
        })
        .catch(err => {
            callback(Message.createText(`Failed to fetch latest galleries. Error: ${JSON.stringify(err)}`));
        });
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};