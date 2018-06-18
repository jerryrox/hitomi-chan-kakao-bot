const viewTypes = require('./viewTypes');
const Auth = require("./Auth");
const Home = require("./Home");
const Search = require("./Search");
const Gallery = require("./Gallery");
const IView = require("./IView");

const UserState = require("../controllers/UserState");

/**
 * Returns the view interface that corresponds to a user's current view state.
 * @param {string} userKey 
 * @returns {IView}
 */
function current(userKey) {
    let viewInx = UserState.getViewType(userKey);
    switch(viewInx) {
    case viewTypes.auth: return Auth;
    case viewTypes.home: return Home;
    case viewTypes.search: return Search;
    case viewTypes.gallery: return Gallery;
    }
    console.log(`views.current - This shouldn't have happened... (viewType: ${viewInx})`);
    return IView;
}

module.exports = {
    current
};