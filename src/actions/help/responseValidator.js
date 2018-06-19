/**
 * Returns whether specified gallery data is a valid object.
 * @param {Object} data 
 */
function isValidGallerySingle(data) {
    return data !== undefined && data !== null;
}

/**
 * Returns whether specified gallery data is a valid array of gallery objects.
 * @param {Array} data 
 */
function isValidGalleryArray(data) {
    return data !== undefined && data !== null && data.length > 0;
}

module.exports = {
    isValidGallerySingle,
    isValidGalleryArray
};