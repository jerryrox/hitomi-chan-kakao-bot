const { Message } = require("../responses");
const { UserState } = require("../controllers");
const viewTypes = require("../views/viewTypes");
const axios = require("axios");
const galleryFormatter = require("./help/galleryFormatter");
const queryBuilder = require("./help/queryBuilder");
const { API_GALLERY } = require("../urls");
const { isValidGallery } = require("./help/responseValidator");

/**
 * Returns the command which triggers this action.
 * @returns {string}
 */
function getCommand() {
    return "detail";
}

/**
 * Returns the description of this action.
 */
function getDescription() {
    return "Displays the gallery details of specified id.";
}

/**
 * Returns the message to display for help action.
 * @returns {string}
 */
function getHelpMessage(userKey) {
    let idCondition = (
        UserState.getViewType(userKey) === viewTypes.gallery ? " (optional)" : ""
    );
    return `"${getCommand()} {id${idCondition}}"\n${getDescription()}`;
}

/**
 * Invokes action.
 * @param {string} userKey
 * @param {Array<string>} params
 * @param {(data: Object) => void}
 */
function doAction(userKey, params, callback) {
    if(params.length === 0) {
        // If viewing gallery view, display details of curent gallery.
        if(UserState.getViewType(userKey) === viewTypes.gallery) {
            callbackDetail(callback, UserState.getCurGallery(userKey));
            return;
        }
        else {
            callback(Message.createText("You must provide a gallery id."));
            return;
        }
    }

    let query = queryBuilder.buildQuery({
        id: params[0]
    });
    let detailUrl = API_GALLERY + query;
    
    axios.get(detailUrl)
        .then(res => {
            if(!isValidGallery(res.data.data))
                throw Error("No gallery exists!");

            let galleryData = res.data.data[0];

            callbackDetail(callback, galleryData);
        })
        .catch(err => {
            callback(Message.createText(`Could not find gallery details with id: ${params[0]}`));
        });
}

function callbackDetail(callback, gallery) {
    callback(Message.createText(
        galleryFormatter.formatDetail(gallery)
    ));
}

module.exports = {
    getCommand,
    getDescription,
    getHelpMessage,
    doAction
};