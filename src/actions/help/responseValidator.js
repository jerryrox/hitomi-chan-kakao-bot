/**
 * Returns whether specified gallery data is a valid array of gallery objects.
 * @param {Array} data 
 */
function isValidGallery(data) {
    return data !== undefined && data !== null && data.length > 0;
}

module.exports = {
    isValidGallery
};