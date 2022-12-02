// Call Express
const express = require("express")
// Call Validator package
const validator = require("validator")
// Create a router so that we can define API routes in this file.
const router = express.Router()
// Access the books model so that we can access book data in this file.
const bookModel = require("../models/bookModel")
// Access the logs model so that we can access book data in this file.
const logModel = require("../models/logModel")

// Define an /api/books endpoint that responds with
// an array of all books.
router.get("/books", (req, res) => {
    bookModel.getAllBooks()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // Log any errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

// Define an /api/books endpoint that responds with
// an array of user-logged interactions 
router.get("/books/userlog", (req, res) => {
    logModel.getAllLogs()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // Log any errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

// Define an api endpoint to create books 
router.post("/books/create", (req, res) => {
    // req.body represents the form field data (json in body of fetch)
    let book = req.body

    // Each of the following names reference the "name"
    // attribute in the inputs of the form. 
    bookModel.createBook(
        validator.escape(book.bookTitle),
        validator.escape(book.originalTitle),
        validator.escape(book.yearofPublication),
        validator.escape(book.genre),
        validator.escape(book.millionsSold),
        validator.escape(book.languageWritten),
        validator.escape(book.coverImagePath),
        validator.escape(book.authorID)
    )
    .then((result) => {
        res.status(200).json("book created with id " + result.insertId)
        let dateTimeNow = (new Date()).toISOString()
        // Convert dateTimeNow to datetimeConverted
        date = new Date(dateTimeNow);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();
        hr = date.getHours();
        mn = date.getMinutes();
        sc = date.getSeconds();

        if (dt < 10) {
            dt = '0' + dt;
        }

        if (month < 10) {
            month = '0' + month;
        }

        if (hr < 10) {
            hr = '0' + hr;
        }

        if (mn < 10) {
            mn = '0' + mn;
        }

        if (sc < 10) {
            mn = '0' + mn;
        }
        const datetimeConverted = year + '-' + month + '-' + dt + " " + hr + ":" + mn + ":" + sc;
        // Call logModel to add dateCreated in changelog
        logModel.addLogEntryBook(result.insertId, req.session.user.userID, datetimeConverted)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("query error - failed to create book")
    })
})

// Define an /api/books endpoint that responds with
// a specific book by id
router.get("/books/:id", (req, res) => {
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json('failed to find book by id')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
    })

// Define an /api/books/update endpoint that updates an existing book
router.post("/books/update", (req, res) => {
    // the req.body represents the posted json data
    let book = req.body 

    // Each of the names below reference the "name" attribute in the form
    bookModel.updateBook(
        validator.escape(book.bookID),
        validator.escape(book.bookTitle),
        validator.escape(book.originalTitle),
        validator.escape(book.yearofPublication),
        validator.escape(book.genre),
        validator.escape(book.millionsSold),
        validator.escape(book.languageWritten),
        validator.escape(book.coverImagePath),
        validator.escape(book.authorID)
    )
    .then((result) => {
        if (result.affectedRows > 0) {
            console.log(result)
            res.status(200).json("book updated")
            let dateTimeNow = (new Date()).toISOString()
            // Convert dateTimeNow to datetimeConverted
            date = new Date(dateTimeNow);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            dt = date.getDate();
            hr = date.getHours();
            mn = date.getMinutes();
            sc = date.getSeconds();

            if (dt < 10) {
                dt = '0' + dt;
            }

            if (month < 10) {
                month = '0' + month;
            }

            if (hr < 10) {
                hr = '0' + hr;
            }

            if (mn < 10) {
                mn = '0' + mn;
            }

            if (sc < 10) {
                mn = '0' + mn;
            }
            const datetimeConverted = year + '-' + month + '-' + dt + " " + hr + ":" + mn + ":" + sc;
            // Call logModel to add dateChanged in changelog 
            logModel.updateLogEntryBook(book.bookID, req.session.user.userID, datetimeConverted)
            .catch((error) => {
                console.log(error)
            })
        } else {
            res.status(404).json("book not found")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to update book - query error')
    })
})

// Define an endpoint for deleting users.
router.post("/books/delete", (req, res) => {
    // Access the book id from the body of the request
    let bookID = req.body.bookID

    // Ask the model to delete the book with bookID
    bookModel.deleteBook(bookID)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book deleted")
            } else {
                res.status(404).json('book not found')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to delete book - query error')
        })
})

// This allows the server.js to import (require) the
// routes define in this file.
module.exports = router