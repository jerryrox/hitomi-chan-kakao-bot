const { applyRoot } = require("../utils");

/**
 * @param {Boolean} includeRoot
 * @param {Array<string>} names
 */
function createButtons(includeRoot = false, ...names) {
    return applyRoot("keyboard", includeRoot, {
        type: "buttons",
        buttons: names
    });
};

/**
 * @param {Boolean} includeRoot
 */
function createText(includeRoot = false) {
    return applyRoot("keyboard", includeRoot, {
        type: "text"
    });
}

module.exports = {
    createButtons,
    createText
};