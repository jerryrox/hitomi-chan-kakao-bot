const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
    console.log(`Unknown GET request to ${req.originalUrl}`);
    res.send({});
});

router.post("*", (req, res) => {
    console.log(`Unknown POST request to ${req.originalUrl}`);
    res.send({});
});

router.delete("*", (req, res) => {
    console.log(`Unknown DELETE request to ${req.originalUrl}`);
    res.send({});
});

module.exports = router;