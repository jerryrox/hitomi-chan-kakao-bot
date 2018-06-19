class Command {

    /**
     * @param {Array<string>} words 
     */
    constructor(words) {
        this.command = words[0].toLowerCase();

        words.splice(0, 1);
        this.params = words;
    }
}

/**
 * Parses specified raw text as a command object.
 * @param {string} rawText 
 * @returns {Command}
 */
function parse(rawText) {
    return new Command(rawText.split(" "));
}

module.exports = {
    parse
};