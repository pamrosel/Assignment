// Access the database connection from database.js 
const db = require("../database")

// Get all book info
module.exports.getAllBooks = () => {
    return db.query("SELECT bo.bookID, bo.bookTitle, bo.originalTitle, bo.yearofPublication, bo.genre, bo.millionsSold, bo.languageWritten, bo.coverImagePath, bo.authorID, au.name, au.surname FROM book bo INNER JOIN author au ON bo.authorID = au.authorID ORDER BY au.surname ASC")
}

// Create a book in the db
module.exports.createBook = (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
    return db.query("INSERT INTO book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) "
        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID])
}

// Get all book info where book id = ? 
module.exports.getBookById = (id) => {
    return db.query("SELECT * FROM book WHERE bookID = ?", [id])
}

// Update book info where book id = ?
module.exports.updateBook = (bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
    return db.query("UPDATE book SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, coverImagePath = ?, authorID = ? WHERE bookID = ?", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID, bookID])
}

// Delete a book where id = ? 
module.exports.deleteBook = (bookID) => {
    return db.query("DELETE FROM book WHERE bookID = ?", [bookID])
}