const userHandler = require("../models/userHandler.js");
const router = require("express").Router();

router
    .get("/", (req, res) => {
        userHandler.getAllUsers()
            .then((data) => res.json(data))
            // TODO: WEB-28: Change this to use custom error handler
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .get("/search", (req, res) => {
        const { query } = req.query;
    
        if (!query) {
            return res.status(400).json({ error: "A query string is required" });
        }
    
        userHandler.searchUsers(query)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .get("/bulk", (req, res) => {
        const { ids } = req.query;

        console.log("req.query id", ids);

        userHandler.getBulkUsers(ids)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .get("/:id", (req, res) => {
        const id = req.params.id;

        userHandler.getUserById(id)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .post("/", (req, res) => {
        const user = req.body;

        userHandler.createUser(user)
            .then((data) => res.status(201).json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .put("/:id", (req, res) => {
        const user = req.body;

        userHandler.updateUser(user, req.params.id)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })
    .delete("/:id", (req, res) => {
        userHandler.deleteUser(req.params.id)
            .then((data) => res.status(200).send(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    })

module.exports = router;