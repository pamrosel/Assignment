// Access the database connection from database.js
const db = require('../database')

// Get all user info
module.exports.getAllUsers = () => {
    return db.query("SELECT UserID, firstName, lastName, email, username, accessRights"
    + " FROM users ORDER BY lastName ASC")}

// Create a user 
module.exports.createUser = (firstName, lastName, email, username, password, accessRights) => {
    return db.query("INSERT INTO users (firstName, lastName, email, username, password, accessRights) "
        + "VALUES (?, ?, ?, ?, ?, ?)", [firstName, lastName, email, username, password, accessRights])
}

// Get a user where id = ? 
module.exports.getUserById = (id) => {
    return db.query("SELECT * FROM users WHERE userID = ?", [id])
}

// Get a user where username = ? 
module.exports.getUserByUsername = (username) => {
    return db.query("SELECT * FROM users WHERE username = ?", [username])
}

// Update a user 
module.exports.updateUser = (UserID, firstName, lastName, email, username, password, accessRights) => {
    return db.query("UPDATE users SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, accessRights = ? WHERE UserID = ?", [firstName, lastName, email, username, password, accessRights, UserID])
}

// Delete a user 
module.exports.deleteUser = (UserID) => {
    return db.query("DELETE FROM users WHERE UserID = ?", [UserID])
}