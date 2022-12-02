const db = require("../database")

// Get all user information joining changelog, book, users tables
module.exports.getAllLogs = () => {
    return db.query("SELECT log.dateCreated, log.dateChanged, log.bookID, log.userID, bo.bookTitle, us.username, us.firstName, us.lastName FROM changelog log INNER JOIN book bo ON log.bookID = bo.bookID INNER JOIN users us ON log.userID = us.userID ORDER BY dateChanged DESC")
}

// dateCreated info for a log on book creation 
module.exports.addLogEntryBook = (bookID, userID, dateCreated) => {
    return db.query("INSERT INTO changelog (bookID, userID, dateCreated) " + "VALUES (?, ?, ?)", [bookID, userID, dateCreated])
}

// dateChanged info for a log on book update
module.exports.updateLogEntryBook = (bookID, userID, dateChanged) => {
    // update changelog dateChanged, userID WHERE bookID = ?
    return db.query("UPDATE changelog SET userID = ?, dateChanged = ? WHERE bookID = ? ", [userID, dateChanged, bookID])
}