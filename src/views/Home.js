const { Keyboard, Message } = require("../responses");
const { UserAuth, UserState } = require("../controllers");
const viewTypes = require("./viewTypes");
const axios = require("axios");
const constants = require("../constants");

/**
 * Evaluates message and executes callback with a Message object.
 * @param {string} userKey
 * @param {string} content 
 * @param {(data: Object) => void} callback
 */
function handleMessage(userKey, content, callback) {
    let words = content.split(" ");

    switch(words[0].toLowerCase()) {
    case "help":
        handleHelp(callback);
        break;
    case "logout":
        handleLogout(userKey, callback);
        break;
    case "latest":
        handleLatest(callback);
        break;
    case "search":
        handleSearch(userKey, callback);
        break;
    case "view":
        handleView(userKey, words[1], callback);
        break;
    default:
        handleUnknown(words[0], callback);
        break;
    }
}

function handleUnknown(command, callback) {
    callback(Message.createText(`Unknown command: ${command}`));
}

function handleHelp(callback) {
    callback(Message.createText(`
"help"
Displays this message.

"logout"
Unauthenticates current session.

"latest"
Returns the latest 15 galleries.

"search"
Displays search interface.

"view {id}"
Displays gallery interface with specified gallery id.
    `));
}

function handleLogout(userKey, callback) {
    UserAuth.removeAuth(userKey);
    callback(Message.createText("Successfully logged out."));
}

function handleLatest(callback) {
    axios.get(constants.HITOMI_CHAN_GALLERY)
        .then(res => {
            callback(Message.createText(JSON.stringify(res.data.data)));
        })
        .catch(err => {
            callback(Message.createText("Failed to fetch latest galleries."));
        });
}

function handleSearch(userKey, callback) {
    UserState.setViewType(userKey, viewTypes.search);
    callback(Message.createText("Viewing Search."));
}

function handleView(userKey, id, callback) {
    UserState.setCurGallery(userKey, id);
    UserState.setViewType(userKey, viewTypes.gallery);
    callback(Message.createText(`Viewing Gallery ${id}`));
}

module.exports = {
    handleMessage
};