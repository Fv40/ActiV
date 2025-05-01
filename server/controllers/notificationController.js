const notificationHandler = require("../models/notificationHandler.js");
const router = require("express").Router();

router
  .get("/:user_id", (req, res) => {
    notificationHandler
      .getInvitesForUser(req.params.user_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .post("/", async (req, res) => {
    const { group_id, user_id } = req.body;
    try {
      const alreadyInvited = await notificationHandler.hasUnreadInvite(
        group_id,
        user_id
      );
      if (alreadyInvited) {
        return res
          .status(409)
          .json({ error: "User already has an unread invite for this group." });
      }
      const data = await notificationHandler.createInvite(group_id, user_id);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put("/:invite_id/read", (req, res) => {
    notificationHandler
      .setRead(req.params.invite_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
