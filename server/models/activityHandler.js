const constants = require("./constants.js");
const connection = require("./connection.js");
const { friendGroupTable } = require("./friendgroupHandler.js");

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

async function getActivitiesForUser(user_id, sort = 'date', order = 'desc') {
  const { data: activities, error } = await selectAllActivities()
    .eq("user_id", user_id)
    .not("activity_description", "ilike", constants.DELETED)
    .order(sort, { ascending: order === 'asc' });

  if (error) {
    throw error;
  }

  return activities;
}

async function getActivitiesForBulkUsers(user_ids, sort = 'activity_date', order = 'desc') {
  const { data: activities, error } = await selectAllActivities()
    .in("user_id", user_ids)
    .not("activity_description", "ilike", constants.DELETED)
    .order(sort, { ascending: order === 'asc' });

  if (error) {
    throw error;
  }

  return activities;
}

async function getAllActivitiesForFriendGroup(group_id, sort = 'group_id', order = 'desc') {
  const { data: users, error } = await friendGroupTable()
    .select("group_members")
    .order(sort, { ascending: order === 'asc' })
    .eq("group_id", group_id)
    .not("group_name", "ilike", constants.DELETED)
    .single();

  if (error) {
    throw error;
  }

  return getActivitiesForBulkUsers(users.group_members);
}

async function getAllActivitiesForBulkFriendGroups(ids, sort = 'group_id', order = 'desc') {  
  let freindgroupIds = [];
  if (ids.includes(",")) {
    friendgroupIds = ids.split(",");
  } else {
    friendgroupIds = [ids];
  }

  const { data: users, error } = await friendGroupTable()
    .select("group_members")
    .in("group_id", friendgroupIds)
    .not("group_name", "ilike", constants.DELETED)
    .order(sort, { ascending: order === 'asc' });

    console.log('users', users);

  // Combine all returned group members into a single array
  const allUserIds = users
    .flatMap((group) => group.group_members)
    .filter((id, idx, arr) => arr.indexOf(id) === idx);

  if (error) {
    throw error;
  }

  return getActivitiesForBulkUsers(allUserIds);
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
  getAllActivitiesForFriendGroup,
  getAllActivitiesForBulkFriendGroups,
  createActivity,
  updateActivity,
  deleteActivity,
};
