const constants = require("../constants.js");
const connection = require("./connection.js");

const TABLE = "activities";

const activityTable = () => connection.connect().from(TABLE);

const selectAllActivities = () => {
  return activityTable().select("*");
};

async function getAllActivities() {
  const { data: activities, error } = await selectAllActivities().not(
    "activity_description",
    "ilike",
    constants.DELETED
  );

  if (error) {
    throw error;
  }

  return activities;
}

async function getActivitiesForUser(user_id) {
  const { data: activities, error } = await selectAllActivities()
    .eq("user_id", user_id)
    .not("activity_description", "ilike", constants.DELETED);

  if (error) {
    throw error;
  }

  return activities;
}

async function getActivitiesForBulkUsers(user_ids) {
  const { data: activities, error } = await selectAllActivities()
    .in("user_id", user_ids)
    .not("activity_description", "ilike", constants.DELETED);

  if (error) {
    throw error;
  }

  return activities;
}

async function createActivity(activityToCreate) {
  const { data: newActivity, error } = await activityTable()
    .insert(activityToCreate)
    .select("*");

  if (error) {
    throw error;
  }

  return newActivity;
}

async function updateActivity(activity, activity_id) {
  const { data: updatedActivity, error } = await activityTable()
    .update(activity)
    .eq("activity_id", activity_id)
    .select("*")
    .not("activity_description", "ilike", constants.DELETED);

  if (error) {
    throw error;
  }

  return updatedActivity;
}

async function deleteActivity(activity_id) {
  const { data: activity, delError } = await selectAllActivities()
    .eq("activity_id", activity_id)
    .not("activity_description", "ilike", constants.DELETED)
    .single();

  if (delError) {
    throw delError;
  }

  const deleteActivity = {
    activity_description: `${constants.DELETED}_${activity.activity_description}`,
  };

  const { data: deletedUser, error } = await await activityTable()
    .update(deleteActivity)
    .eq("activity_id", activity_id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return deletedUser;
}

module.exports = {
  getAllActivities,
  getActivitiesForUser,
  getActivitiesForBulkUsers,
  createActivity,
  updateActivity,
  deleteActivity,
};
