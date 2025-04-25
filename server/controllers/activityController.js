const activityHandler = require("../models/activityHandler.js");
const router = require("express").Router();

router
   // TODO: WEB-36 Remove this endpoint when friend groups are implemented?
  .get("/", (req, res) => {
    activityHandler
      .getAllActivities()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/:user_id", (req, res) => {
    const user_id = req.params.user_id;

    activityHandler
      .getActivitiesForUser(user_id)
      .then((data) => res.json(data))
      // TODO: WEB-28: Change this to use custom error handler
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/frendgroups/:friendgroup_id", (req, res) => {
    activityHandler
      .getAllActivitiesForFriendGroup()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .post("/", (req, res) => {
    const activity = req.body;

    activityHandler
      .createActivity(activity)
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .put("/:id", (req, res) => {
    const activity = req.body;

    activityHandler
      .updateActivity(activity, req.params.id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .delete("/:id", (req, res) => {
    activityHandler
      .deleteActivity(req.params.id)
      .then(() => res.status(204).send())
      .catch((error) => res.status(500).json({ error: error.message }));
  });

module.exports = router;
