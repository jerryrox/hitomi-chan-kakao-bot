const express = require('express');
const router = express.Router();

const { Keyboard } = require("../responses");

router.get("/", (req, res) => {
    res.send(Keyboard.createText());
});

module.exports = router;