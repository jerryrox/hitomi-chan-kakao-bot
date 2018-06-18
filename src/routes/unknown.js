const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
    console.log(`Unknown GET request to ${req.originalUrl}`);
});

router.post("*", (req, res) => {
    console.log(`Unknown POST request to ${req.originalUrl}`);
});

router.delete("*", (req, res) => {
    console.log(`Unknown DELETE request to ${req.originalUrl}`);
});

module.exports = router;