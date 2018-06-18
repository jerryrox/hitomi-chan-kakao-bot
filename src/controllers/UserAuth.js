const UserSession = require("../models/UserSession");

const SECRET_CREDENTIAL = "ecchi_hitomi";

/**
 * Returns whether a user is authenticated.
 * @param {string} userKey 
 */
function isAuthenticated(userKey) {
    return UserSession.containsUser(userKey);
}

/**
 * Tries authenticating user.
 * Returns whether authentication was successful.
 * @param {string} userKey 
 * @param {string} credential
 * @return {Boolean} 
 */
function authenticate(userKey, credential) {
    if(isAuthenticated(userKey))
        return true;
    if(credential !== SECRET_CREDENTIAL)
        return false;
    UserSession.addUser(userKey);
    return true;
}

/**
 * Removes user from authenticated session.
 */
function removeAuth(userKey) {
    UserSession.removeUser(userKey);
    return;
}

module.exports = {
    isAuthenticated,
    authenticate,
    removeAuth
};