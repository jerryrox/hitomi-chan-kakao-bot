const { Message } = require("../responses");
const { UserState } = require("../controllers");
const viewTypes = require("../views/viewTypes");
const axios = require("axios");
const queryBuilder = require("./help/queryBuilder");
const { API_GALLERY } = require("../urls");
const { isValidGallery } = require("./help/responseValidator");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "view";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Displays gallery interface with specified gallery id.";
}

/**
 * Returns the message to display for help action.
 * @returns {string}
 */
function getHelpMessage() {
    return `"${getCommand()} {id}"\n${getDescription()}`;
}

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    let query = queryBuilder.buildQuery({
        id: params[0]
    });
    let url = API_GALLERY + query;
    
    axios.get(url)
        .then(res => {
            if(!isValidGallery(res.data.data))
                throw Error("No gallery exists!");

            let galleryData = res.data.data[0];
            
            UserState.setCurGallery(userKey, galleryData);
            UserState.setViewType(userKey, viewTypes.gallery);
            callback(Message.createText(`Viewing Gallery ${params[0]}`));
        })
        .catch(err => {
            callback(Message.createText(`Gallery with specified id (${params[0]}) doesn't exist.`));
        });
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};