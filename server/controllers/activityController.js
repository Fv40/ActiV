const activityHandler = require("../models/activityHandler.js");
const router = require("express").Router();

router
  .get("/", (req, res) => {
    activityHandler
      .getAllActivities()
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/friendgroups", (req, res) => {
    console.log('req.query', req.query);
    const { ids, sort, order } = req.query;
    console.log('ids', ids);

    activityHandler
      .getAllActivitiesForBulkFriendGroups(ids, order)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/friendgroups/:group_id", (req, res) => {
    const { sort, order } = req.query;

    const group_id = req.params.group_id;

    activityHandler
      .getAllActivitiesForFriendGroup(group_id, sort, order)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/:user_id", (req, res) => {
    const { sort, order } = req.query;

    const user_id = req.params.user_id;

    activityHandler
      .getActivitiesForUser(user_id, sort, order)
      .then((data) => res.json(data))
      // TODO: WEB-28: Change this to use custom error handler
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
