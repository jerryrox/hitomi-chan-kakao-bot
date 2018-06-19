/**
 * Creates a new Object with specified targetObj associated to the rootName.
 * @param {string} rootName 
 * @param {Boolean} shouldApply
 * @param {Object} targetObj 
 */
function applyRoot(rootName, shouldApply, targetObj) {
    if(shouldApply)
        return { [rootName]: targetObj };
    return targetObj;
}

/**
 * Convenient error logging.
 * @param {string} method 
 * @param {string} route 
 * @param {Object} err 
 */
function logError(method, route, err) {
    console.log(`${method} ${route} - Error: ${JSON.stringify(err)}`);
}

/**
 * Reduces an array of string separated by ", ".
 * @param {Array<string>} strings
 * @returns {string}
 */
function listStrings(strings) {
    if(typeof(strings) === "string")
        return strings;
    return strings.reduce((a, b) => `${a}, ${b}`);
}

module.exports = {
    applyRoot,
    logError,
    listStrings
};