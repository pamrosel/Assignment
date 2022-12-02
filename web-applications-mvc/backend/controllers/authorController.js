// Call express 
const express = require("express")
// Call validator plugin 
const validator = require("validator")
// Create a router so that we can define API routes in this file.
const router = express.Router()
// Access the author model so that we can access author data in this file.
const authorModel = require("../models/authorModel")

// Define an /api/authors endpoint that responds with
// an array of all authors.
router.get("/authors", (req, res) => {
    authorModel.getAllAuthors()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // Log any errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

// Define an endpoint for creating authors
router.post("/authors/create", (req, res) => {
    // req.body represents the form field data (json in body of fetch)
    let author = req.body

    // Each of the following names reference the "name"
    // attribute in the inputs of the form. 
    authorModel.createAuthor(
        validator.escape(author.name),
        validator.escape(author.surname),
        validator.escape(author.nationality),
        validator.escape(author.birthYear),
        validator.escape(author.deathYear)
    )
    .then((result) => {
        res.status(200).json("author created with id " + result.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("query error - failed to create author")
    })
})

// Define an /api/authors endpoint that responds with
// a specific author by id
router.get("/authors/:id", (req, res) => {
    authorModel.getAuthorById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json('failed to find author by id')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
    })


// Define an /api/authors/update endpoint that updates an existing user
router.post("/authors/update", (req, res) => {
    // the req.body represents the posted json data
    let author = req.body 

    // Each of the names below reference the "name" attribute in the form
    authorModel.updateAuthor(
        validator.escape(author.authorID),
        validator.escape(author.name),
        validator.escape(author.surname),
        validator.escape(author.nationality),
        validator.escape(author.birthYear),
        validator.escape(author.deathYear)
    )
    .then((result) => {
        if (result.affectedRows > 0) {
            res.status(200).json("author updated")
        } else {
            res.status(404).json("author not found")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to update author - query error')
    })
})

// Define an api endpoint for deleting authors
router.post("/authors/delete", (req, res) => {
    // Access the author id from the body of the request
    let authorID = req.body.authorID

    // Ask the model to delete the author with authorID
    authorModel.deleteAuthor(authorID)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("author deleted")
            } else {
                res.status(404).json('author not found')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to delete author - query error')
        })
})

// This allows the server.js to import (require) the
// routes define in this file.
module.exports = router