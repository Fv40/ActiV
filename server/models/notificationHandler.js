const connection = require("./connection.js");
const TABLE = "friendgroupinvities";

const inviteTable = () => connection.connect().from(TABLE);

async function getInvitesForUser(user_id) {
  const { data: invites, error } = await inviteTable()
    .select("*")
    .eq("user_id", user_id)
    .eq("is_read", false)
    .order("invite_date", { ascending: false });

  if (error) throw error;
  return invites;
}

async function setRead(invite_id) {
  const { data: invite, error } = await inviteTable()
    .update({ is_read: true })
    .eq("invite_id", invite_id)
    .select("*")
    .single();

  if (error) throw error;
  return invite;
}

async function createInvite(group_id, user_id) {
  const { data: newInvite, error } = await inviteTable()
    .insert({
      group_id,
      user_id,
      is_read: false,
      invite_date: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw error;
  return newInvite;
}

async function hasUnreadInvite(group_id, user_id) {
  const { data: invites, error } = await inviteTable()
    .select("*")
    .eq("group_id", group_id)
    .eq("user_id", user_id)
    .eq("is_read", false);

  if (error) throw error;
  return invites && invites.length > 0;
}

module.exports = {
  inviteTable,
  getInvitesForUser,
  setRead,
  createInvite,
  hasUnreadInvite,
};
