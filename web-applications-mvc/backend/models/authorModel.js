// Access the database connection from database.js 
const db = require("../database")

// Get all author info
module.exports.getAllAuthors = () => {
    return db.query("SELECT * FROM author ORDER BY surname ASC")
}

// Get all author info where ID = ? 
module.exports.getAuthorById = (id) => {
    return db.query("SELECT * FROM author WHERE authorID = ?", [id])
}

// Create an author in db
module.exports.createAuthor = (name, surname, nationality, birthYear, deathYear) => {
    return db.query("INSERT INTO author (name, surname, nationality, birthYear, deathYear) "
        + "VALUES (?, ?, ?, ?, ?)", [name, surname, nationality, birthYear, deathYear])
}

// Update an author in db
module.exports.updateAuthor = (authorID, name, surname, nationality, birthYear, deathYear) => {
    return db.query("UPDATE author SET name = ?, surname = ?, nationality = ?, birthYear = ?, deathYear = ? WHERE authorID = ?", [name, surname, nationality, birthYear, deathYear, authorID])
}

// Delete an author from db
module.exports.deleteAuthor = (authorID) => {
    return db.query("DELETE FROM author WHERE authorID = ?", [authorID])
}