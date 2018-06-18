const express = require("express");
const router = express.Router();

const { current } = require("../views");
const { logError } = require("../utils");
const { Message, Keyboard } = require("../responses");

router.post("/", (req, res) => {
    try {
        const {user_key, type, content} = req.body;

        // Unsupported types.
        if(type !== "text") {
            res.send(Message.createText("Invalid message type. Please enter 'text' values only."));
            return;
        }

        current(user_key).handleMessage(user_key, content, (data) => {
            res.send({
                message: data,
                keyboard: Keyboard.createText()
            });
        });
    }
    catch(e) {
        logError("POST", "/message", e);
        res.send(Message.createText("An error occured in server.", true));
    }
});

module.exports = router;