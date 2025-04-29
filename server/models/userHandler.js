const constants = require("./constants.js");
const connection = require("./connection.js");
const { v4: uuidv4 } = require("uuid");

const TABLE = "users";

const userTable = () => connection.connect().from(TABLE);

const selectAllUsers = () => {
  return userTable().select("*");
};

async function getAllUsers() {
  const { data: users, error } = await selectAllUsers().not(
    "username",
    "ilike",
    constants.DELETED
  );

  if (error) {
    throw error;
  }

  return users;
}

async function getBulkUsers(body) {
  const { data: users, error } = await selectAllUsers()
    .in("user_id", body.ids)
    .not("username", "ilike", constants.DELETED);

  if (error) {
    throw error;
  }

  return users;
}

async function getUserById(id) {
  const { data: user, error } = await selectAllUsers()
    .eq("user_id", id)
    .not("username", "ilike", constants.DELETED)
    .single();

  if (error) {
    throw error;
  }

  return user;
}

async function createUser(userToCreate) {
  const { data: newUser, error } = await userTable()
    .insert(userToCreate)
    .select("*");

  if (error) {
    throw error;
  }

  return newUser;
}

async function updateUser(user, user_id) {
  const { data: updatedUser, error } = await userTable()
    .update(user)
    .eq("user_id", user_id)
    .select("*")
    .not("username", "ilike", constants.DELETED);

  if (error) {
    throw error;
  }

  return updatedUser;
}

async function deleteUser(user_id) {
  const { data: user, error: userError } = await selectAllUsers()
    .eq("user_id", user_id)
    .not("username", "ilike", constants.DELETED)
    .single();

  if (userError) {
    throw userError;
  }

  // If a user that shares a username with a deleted user is itself deleted, a duplicate key error will be thrown by db
  const uuid = uuidv4();
  const deleteUser = {
    username: `${user.username}_${constants.DELETED}_${uuid}`,
    email: `${user.email}_${constants.DELETED}_${uuid}`,
  };

  const { data: deletedUser, error } = await await userTable()
    .update(deleteUser)
    .eq("user_id", user_id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return deletedUser;
}

module.exports = {
  userTable,
  getAllUsers,
  getUserById,
  getBulkUsers,
  createUser,
  updateUser,
  deleteUser,
};
