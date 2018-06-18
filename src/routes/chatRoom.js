const express = require("express");
const router = express.Router();

const { UserAuth } = require("../controllers");

router.delete("/:id", (req, res) => {
    UserAuth.removeAuth(req.params.id);
    res.status(200).send("Success");
});

module.exports = router;