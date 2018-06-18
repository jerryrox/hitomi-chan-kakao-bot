const viewTypes = require("../views/viewTypes");

class UserSession {

    /**
     * @param {string} userKey 
     */
    constructor(userKey) {
        this.userKey = userKey;
        this.viewType = viewTypes.auth;

        this.isAnonymous = this.isAnonymous.bind(this);
        this.setViewType = this.setViewType.bind(this);
    }

    isAnonymous() {
        return this.userKey === undefined || this.userKey === null || this.userKey.length === 0;
    };

    setViewType(viewType) {
        if(this.isAnonymous())
            return;
        this.viewType = viewType;
    };
}

// Users
const anonymousUser = new UserSession();

/**
 * Returns list of all users.
 * @returns {Array<UserSession>}
 */
function getAllUsers() {
    if(!global.us_users)
        global.us_users = [];
    return global.us_users;
};

/**
 * Returns user with specified key.
 * @param {string} userKey
 * @returns {UserSession}
 */
function getUser(userKey) {
    let userInx = findUser(userKey);
    if(userInx >= 0)
        return getAllUsers()[userInx];
    return anonymousUser;
}

/**
 * Returns whether user with specified key exists in the session.
 * @param {string} userKey 
 * @return {Boolean}
 */
function containsUser(userKey) {
    return findUser(userKey) >= 0;
}

/**
 * Returns a user's index in session with specified key.
 * @param {string} userKey 
 */
function findUser(userKey) {
    return getAllUsers().findIndex(user => user.userKey === userKey);
}

/**
 * Adds a new user to authenticated session.
 * @param {string} userKey
 */
function addUser(userKey) {
    getAllUsers().push(createUser(userKey));
}

/**
 * Removes a user with specified key from session.
 * @param {string} userKey 
 */
function removeUser(userKey) {
    let userInx = findUser(userKey);
    if(userInx >= 0)
    getAllUsers().splice(userInx, 1);
}

/**
 * Creates a new UserSession object and returns it.
 * @param {string} userKey 
 */
function createUser(userKey) {
    return new UserSession(userKey);
}

module.exports = {
    getAllUsers,
    getUser,
    containsUser,
    findUser,
    addUser,
    removeUser,
    createUser
};