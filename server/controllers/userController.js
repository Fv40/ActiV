const userHandler = require("../models/userHandler.js");
const express = require("express");
const router = express.Router();

router
    .get("/", (req, res) => {
        userHandler.getAllUsers()
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .get("/:id", (req, res) => {
        const id = req.params.id;
        userHandler.getUserById(id)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    });

module.exports = router;