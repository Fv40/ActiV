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
  .get("/:group_id/activities", (req, res) => {
    const group_id = req.params.group_id;

    friendgroupHandler
      .getAllActivitiesForFriendGroup(group_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
