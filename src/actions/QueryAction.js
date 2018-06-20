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
    return "query";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Returns galleries matching the specified options. Query parameters can have multiple filters by separating with a comma.";
}

/**
 * Returns the message to display for help action.
 * @returns {string}
 */
function getHelpMessage() {
    return `"${getCommand()} {queries (See below)}"\n(page:{number} count:{number} type:{string} c:{string} n:{string} p:{string} t:{string} g:{string} l:{string} a:{string})\n${getDescription()}`;
}

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    let queryObjects = getQueryObject(params);
    // Default count limitation
    if(queryObjects.count === undefined)
        queryObjects.count = 10;
    let query = queryBuilder.buildQuery(queryObjects);

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

/**
 * Parses specified array of raw parameters and returns an object used for creating a query string.
 * @param {Array<string>} params 
 */
function getQueryObject(params) {
    if(params.length === 0)
        return {};

    return params.map(param => {
        let separator = param.indexOf(":");
        if(separator < 0)
            return {};

        let key = param.substr(0, separator);
        if(queryBuilder.supportedParams[key] === undefined)
            return {};

        let val = param.substr(separator+1);
        return {
            [key]: val
        };
    }).reduce((a, b) => {
        return {
            ...a,
            ...b
        };
    });
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};