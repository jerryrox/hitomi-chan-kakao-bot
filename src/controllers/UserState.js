const UserSession = require("../models/UserSession");

/**
 * Returns an authorized user's current view type.
 * @param {string} userKey 
 * @returns {number}
 */
function getViewType(userKey) {
    return UserSession.getUser(userKey).viewType;
}

/**
 * Returns the current gallery object viewing.
 * @param {string} userKey
 * @returns {Object}
 */
function getCurGallery(userKey) {
    return UserSession.getUser(userKey).curGallery;
}

/**
 * Sets a user's current view type.
 * @param {string} userKey 
 * @param {number} viewType 
 */
function setViewType(userKey, viewType) {
    UserSession.getUser(userKey).setViewType(viewType);
}

/**
 * Sets a user's current gallery.
 * @param {string} userKey 
 * @param {Object} gallery
 */
function setCurGallery(userKey, gallery) {
    UserSession.getUser(userKey).setCurGallery(gallery);
}

module.exports = {
    getViewType,
    getCurGallery,
    setViewType,
    setCurGallery
};