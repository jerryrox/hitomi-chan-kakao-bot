const { listStrings } = require("../../utils");

/**
 * Formats specified galleries as:
 * Name
 * id
 * @param {Array<Object>} galleries 
 * @return {string}
 */
function formatSimple(galleries) {
    return galleries.map(gallery => {
        return `"${gallery.n}"\nid: ${gallery.id}`;
    }).reduce((a, b) => {
        return `${a}\n\n${b}`;
    });;
}

/**
 * Formats specified gallery as:
 * Name
 * @param {Object} gallery
 * @return {string}
 */
function formatReadLink(gallery) {
    return gallery.n;
}

/**
 * Formats specified gallery as:
 * Name
 * id
 * type
 * authors
 * language
 * series
 * characters
 * groups
 * tags
 * thumbnail
 * @param {Object} gallery
 * @return {string}
 */
function formatDetail(gallery) {
    let detail = "";
    if(gallery.n) detail += `"${gallery.n}"\n\n`;
    detail += `Id: ${gallery.id}\n\n`;
    if(gallery.type) detail += `Type: ${gallery.type}\n\n`;
    if(gallery.l) detail += `Language: ${gallery.l}\n\n`;
    if(gallery.a && gallery.a.length > 0) detail += `Authors: ${listStrings(gallery.a)}\n\n`;
    if(gallery.p && gallery.p.length > 0) detail += `Series: ${listStrings(gallery.p)}\n\n`;
    if(gallery.c && gallery.c.length > 0) detail += `Characters: ${listStrings(gallery.c)}\n\n`;
    if(gallery.g && gallery.g.length > 0) detail += `Group: ${listStrings(gallery.g)}\n\n`;
    if(gallery.t && gallery.t.length > 0) detail += `Tags: ${listStrings(gallery.t)}`;

    return detail;
}

module.exports = {
    formatSimple,
    formatReadLink,
    formatDetail
};