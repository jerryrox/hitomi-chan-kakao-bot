const { applyRoot } = require("../utils");

/**
 * @param {string} text 
 * @param {Boolean} includeRoot 
 */
function createText(text, includeRoot = false) {
    return applyRoot("message", includeRoot, {
        text
    });
}

/**
 * @param {string} url 
 * @param {number} width 
 * @param {number} height 
 * @param {Boolean} includeRoot 
 */
function createPhoto(url, width, height, includeRoot = false) {
    return applyRoot("message", includeRoot, {
        url,
        width,
        height
    });
}

/**
 * @param {string} label 
 * @param {string} url 
 * @param {Boolean} includeRoot 
 */
function createMessageButton(label, url, includeRoot = false) {
    return applyRoot("message", includeRoot, {
        label,
        url
    });
}

/**
 * Complete form.
 * @param {string} text
 * @param {Object} photo
 * @param {Object} messageButton
 */
function createMessage(text, photo, messageButton, includeRoot = false) {
    return applyRoot("message", includeRoot, {
        text,
        photo,
        message_button: messageButton
    });
}

module.exports = {
    createText,
    createPhoto,
    createMessageButton,
    createMessage
};