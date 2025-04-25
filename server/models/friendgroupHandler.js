const TABLE = "friendgroups";

const friendGroupTable = () => connection.connect().from(TABLE);

async function getFriendGroupById(id) {
  const { data: friendgroup, error } = await friendGroupTable()
    .eq("friendgroup_id", id)
    .not("friendgroup_name", "ilike", constants.DELETED)
    .single();

  if (error) {
    throw error;
  }

  return friendgroup;
}

async function getAllActivitiesForFriendGroup(group_id) {
    const { data: users, error } = await friendGroupTable()
    .eq("friendgroup_id", id)
    .not("friendgroup_name", "ilike", constants.DELETED)
    .select("group_members")
    .single();
  
    if (error) {
      throw error;
    }
  
    return 
  }