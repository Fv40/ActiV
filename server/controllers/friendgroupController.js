const friendgroupHandler = require("../models/friendgroupHandler.js");
const router = require("express").Router();

router
  .get("/:group_id", (req, res) => {
    const group_id = req.params.group_id;

    friendgroupHandler
      .getFriendGroupById(group_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/user/:user_id", (req, res) => {
    const user_id = req.params.user_id;

    friendgroupHandler
      .getFriendgroupsForUser(user_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .delete("/:group_id/user/:user_id", (req, res) => {
    const group_id = req.params.group_id;
    const user_id = req.params.user_id;

    friendgroupHandler
      .removeUserFromFriendGroup(group_id, user_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .post("/:group_id/user/:user_id", (req, res) => {
    const group_id = req.params.group_id;
    const user_id = req.params.user_id;

    friendgroupHandler
      .addUserToFriendgroup(group_id, user_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })

module.exports = router;
