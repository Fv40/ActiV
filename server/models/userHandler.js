import { connect } from "./connection.js";
// TODO WEB-24: Use require here. require throws ReferenceError: require is not defined in this file only 
//const connection = require("./connection.js");

const TABLE = "users";
const userTable = () => 
    connect().from(TABLE);

const selectAllUsers = () => {
    return userTable().select("*");
}

export async function getAllUsers() {
    const { data, error } = await selectAllUsers();

    if (error) {
        throw error
    }

    return data
}

export async function getUserById(id) {
    const { data, error } = await selectAllUsers().eq("user_id", id);

    if (error) {
        throw error
    }

    return data
}

export async function createUser(user) {
    const { data, error } = await userTable().insert(user).select("*");
    
    if (error) {
        throw error
    }

    return data;
}