const connection = require("./connection.js");
const constants = require("./constants.js");

const TABLE = "friendgroups";

const friendGroupTable = () => connection.connect().from(TABLE);
const { userTable } = require("./userHandler.js");

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

async function getFriendgroupsForUser(user_id) {
  const { data: friendgroupids, errorUser } = await userTable()
    .select("friendgroups")
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .single();

  if (errorUser) {
    throw errorUser;
  }

  const { data: friendgroups, error: errorGroup } = await connection
    .connect()
    .from("friendgroups")
    .select("*")
    .in("group_id", friendgroupids.friendgroups);

  if (errorGroup) {
    throw errorGroup;
  }

  return friendgroups;
}

async function removeUserFromFriendGroup(group_id, user_id) {
  const { data: friendgroups, errorUserFriendgroups } = await userTable()
    .select("friendgroups")
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .single();

  const newFriendgroups = friendgroups.friendgroups.filter(
    (group) => group !== Number(group_id)
  );

  const { data: user, errorUser } = await userTable()
    .update({
      friendgroups: newFriendgroups,
    })
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .select("*");

  if (errorUser) {
    throw errorUser;
  }

  const { data: friendgroupMembers, errorFriendgroupMembers } =
    await friendGroupTable()
      .select("group_members")
      .eq("group_id", group_id)
      .not("group_name", "ilike", constants.DELETED)
      .single();

  const newGroupMembers = friendgroupMembers.group_members.filter(
    (member) => member !== Number(user_id)
  );

  const { data: group, errorGroup } = await friendGroupTable()
    .update({
      group_members: newGroupMembers,
    })
    .eq("group_id", group_id)
    .not("group_name", "ilike", constants.DELETED)
    .select("*");

  if (errorGroup) {
    throw errorGroup;
  }

  return group;
}

async function addUserToFriendgroup(group_id, user_id) {
  const { data: friendgroups, errorUserFriendgroups } = await userTable()
    .select("friendgroups")
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .single();

  friendgroups.friendgroups.push(group_id);

  const { data: user, errorUser } = await userTable()
    .update({
      friendgroups: friendgroups.friendgroups,
    })
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .select("*");

  if (errorUser) {
    throw errorUser;
  }

  const { data: friendgroupMembers, errorFriendgroupMembers } =
    await friendGroupTable()
      .select("group_members")
      .eq("group_id", group_id)
      .not("group_name", "ilike", constants.DELETED)
      .single();

  friendgroupMembers.group_members.push(user_id);

  const { data: group, errorGroup } = await friendGroupTable()
    .update({
      group_members: friendgroupMembers.group_members,
    })
    .eq("group_id", group_id)
    .not("group_name", "ilike", constants.DELETED)
    .select("*");

  if (errorGroup) {
    throw errorGroup;
  }

  return group;
}

module.exports = {
  friendGroupTable,
  getFriendGroupById,
  getFriendgroupsForUser,
  removeUserFromFriendGroup,
  addUserToFriendgroup
};
