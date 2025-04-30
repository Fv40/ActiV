const mealHandler = require("../models/mealHandler.js");
const router = require("express").Router();

router
  .post("/", (req, res) => {
    mealHandler
      .createMeal(req.body)
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/user/:user_id", (req, res) => {
    mealHandler
      .getMealsForUser(req.params.user_id, req.query.date)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/:meal_id", (req, res) => {
    mealHandler
      .getMealById(req.params.meal_id)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .put("/:meal_id", (req, res) => {
    mealHandler
      .updateMeal(req.params.meal_id, req.body)
      .then((data) => res.json(data))
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .delete("/:meal_id", (req, res) => {
    mealHandler
      .deleteMeal(req.params.meal_id)
      .then(() => res.status(204).send())
      .catch((error) => res.status(500).json({ error: error.message }));
  })
  .get("/user/:user_id/calories", (req, res) => {
    const { user_id } = req.params;
    const { date, startDate, endDate } = req.query;

    if (date) {
      mealHandler
        .getTotalCaloriesForUserOnDate(user_id, date)
        .then((total) => res.json({ totalCalories: total }))
        .catch((error) => res.status(500).json({ error: error.message }));
    } else if (startDate && endDate) {
      mealHandler
        .getTotalCaloriesForUserInRange(user_id, startDate, endDate)
        .then((total) => res.json({ totalCalories: total }))
        .catch((error) => res.status(500).json({ error: error.message }));
    } else {
      res
        .status(400)
        .json({ error: "Provide either date or startDate and endDate" });
    }
  });

module.exports = router;
