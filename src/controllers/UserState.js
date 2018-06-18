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
 * Returns the current gallery id viewing.
 * @param {string} userKey
 * @returns {number}
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
 * @param {string} galleryId 
 */
function setCurGallery(userKey, galleryId) {
    UserSession.getUser(userKey).setCurGallery(Number(galleryId));
}

module.exports = {
    getViewType,
    getCurGallery,
    setViewType,
    setCurGallery
};