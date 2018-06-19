const supportedParams = {
    page: "page",
    count: "count",
    type: "type",
    c: "c",
    n: "n",
    p: "p",
    t: "t",
    g: "g",
    l: "l",
    a: "a",
    id: "id"
};

/**
 * Returns a string value from specified params for GET query.
 * @param {Object} params 
 */
function buildQuery(params) {
    let queryString = "?";
    for(let key in params) {
        if(supportedParams[key] === undefined)
            continue;

        // Forcing string type.
        params[key] = String(params[key]);

        let entries = params[key].split(",");
        let encodedEntries = entries.map(entry => encodeURIComponent(entry))
        let paramString = encodedEntries.reduce((a, b) => {
            return `${a},${b}`;
        });
        queryString += `${key}=${paramString}&`;
    }
    if(queryString.length === 1)
        return "";
    return queryString.substring(0, queryString.length-1);
}

module.exports = {
    supportedParams,
    buildQuery
};