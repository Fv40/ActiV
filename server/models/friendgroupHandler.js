const connection = require("./connection.js");
const constants = require("./constants.js");
const activityHandler = require("./activityHandler.js");

const TABLE = "friendgroups";

const friendGroupTable = () => connection.connect().from(TABLE);

async function getFriendGroupById(group_id) {
  const { data: friendgroup, error } = await friendGroupTable()
    .select("*")
    .eq("group_id", group_id)
    .not("group_name", "ilike", constants.DELETED)
    .single();

  if (error) {
    throw error;
  }

  return friendgroup;
}

async function getAllActivitiesForFriendGroup(group_id) {
  console.log("Fetching activities for friend group with ID:", group_id);
  const { data: users, error } = await friendGroupTable()
    .select("group_members")
    .eq("group_id", group_id)
    .not("group_name", "ilike", constants.DELETED)
    .single();

  if (error) {
    throw error;
  }

  return activityHandler.getActivitiesForBulkUsers(users.group_members);
}

async function getFriendgroupsForUser(user_id) {
  const { userTable } = require("./userHandler.js");

  const { data: friendgroupids, errorUser } = await userTable()
    .select("friendgroups")
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .single();

  if (error) {
    throw error;
  }

  const { data: friendgroups, error: errorGroup } = await connection
    .connect()
    .from("friendgroups")
    .select("*")
    .in("group_id", friendgroupids);

  if (fgError) throw errorGroup;

  return friendgroups;
}

module.exports = {
  getFriendGroupById,
  getAllActivitiesForFriendGroup,
  getFriendgroupsForUser,
};
