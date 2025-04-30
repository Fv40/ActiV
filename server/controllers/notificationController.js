const notificationHandler = require("../models/notificationHandler.js");
const router = require("express").Router();

router.get("/:user_id", (req, res) => {
  notificationHandler
    .getInvitesForUser(req.params.user_id)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
}).post("/", (req, res) => {
  const { group_id, user_id } = req.body;
  notificationHandler
    .createInvite(group_id, user_id)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(500).json({ error: error.message }));
}).patch("/:invite_id/read", (req, res) => {
  notificationHandler
    .markInviteRead(req.params.invite_id)
    .then(data => res.json(data))
    .catch(error => res.status(500).json({ error: error.message }));
}).delete("/:invite_id", (req, res) => {
  notificationHandler
    .deleteInvite(req.params.invite_id)
    .then(() => res.status(204).send())
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;