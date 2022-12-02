// Call Express
const express = require("express")
// npm install bcrypt
const bcrypt = require("bcrypt")
// npm install validator
const validator = require("validator")
// Create a router so that we can define API routes in this file.
const router = express.Router()
// Access the user model so that we can access book data in this file.
const userModel = require("../models/userModel")

// Define an api to get all users for list_users.html 
router.get("/users", (req, res) => {
    userModel.getAllUsers()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})

// Define an api users/create endpoint to create a new user
router.post("/users/create", (req, res) => {
    //  Designate as admin only action 
    if (req.session.user.accessRights != "admin"){
        res.status(403).json("admin only section")
        return;
    }
    
    // req.body represents the form field data (json in body of fetch)
    let user = req.body

    // Only allow valid emails
    if (validator.isEmail(user.email) == false) {
        res.status(300).json("invalid email")
        return;
    }

    // Hash the password before inserting into the DB
    let hashedPassword = bcrypt.hashSync(user.password, 6)

    // Each of the following names reference the "name"
    // attribute in the inputs of the form. 
    userModel.createUser(
        validator.escape(user.firstName),
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hashedPassword, // now we store the hashed password
        validator.escape(user.accessRights)
    )
    .then((result) => {
        res.status(200).json("user created with id " + result.insertId)
    })
    .catch((error) => {
        res.status(500).json("query error - failed to create user")
    })
})



// Define an /api/users/update endpoint that updates an existing user
router.post("/users/update", (req, res) => {
    //  Designate as admin only action 
    if (req.session.user.accessRights != "admin"){
        res.status(403).json("admin only section")
        return;
    }

    // the req.body represents the posted json data
    let user = req.body 

    // If the password does not start with a $ then we need to hash it
    let hashedPassword = user.password
    if (!user.password.startsWith("$2b$")) {
        hashedPassword = bcrypt.hashSync(user.password, 6)
    }

    // Each of the names below reference the "name" attribute in the form
    userModel.updateUser(
        validator.escape(user.UserID),
        validator.escape(user.firstName),
        validator.escape(user.lastName),
        validator.escape(user.email),
        validator.escape(user.username),
        hashedPassword, // Use the hashed password
        validator.escape(user.accessRights)
    )
    .then((result) => {
        if (result.affectedRows > 0) {
            res.status(200).json("user updated")
        } else {
            res.status(404).json("user not found")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to update user - query error')
    })
})

// Define an api users/delete endpoint for deleting users
router.post("/users/delete", (req, res) => {
    //  Designate as admin only action 
    if (req.session.user.accessRights != "admin"){
        res.status(403).json("admin only section")
        return;
    }

    // Access the user id from the body of the request
    let userID = req.body.userID

    // Ask the model to delete the user with userID
    userModel.deleteUser(userID)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user deleted")
            } else {
                res.status(404).json('user not found')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to delete user - query error')
        })
})

// Define endpoint for logging in 
router.post("/users/login", (req, res) => {
    // Get the login information
    let login = req.body
    // Find a user with a matching username
    userModel.getUserByUsername(login.username)
        .then((results) => {
            // Did we find a user with matching username?
            if (results.length > 0) {
                // Get the first found user
                let user = results[0]
                
                // verify the users password using compareSync
                if (bcrypt.compareSync(login.password, user.password)) {

                    // The user is now authenticated 
                    // setup the session
                    console.log(user)
                    req.session.user = {
                        userID: user.userID,
                        accessRights: user.accessRights,
                        username: user.username
                    }
                    res.status(200).json("logged in")
                } else {
                    // This else case runs if the password did NOT match
                    res.status(401).json("login failed")
                }
            } else {
                res.status(404).json("user not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to login - query error")
        })
})

// Define an endpoint for current user information 
router.get("/users/current", (req, res) => {
    // Find the user who is logged in using session
    userModel.getUserById(req.session.user.userID)
    .then((results) => {
        if (results.length > 0){
            res.status(200).json(results[0])
        } else {
            res.status(404).json('failed to get current user details by id')
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json('failed to get current user - query error')
    })
})

// Define a logout endpoint 
router.post("/users/logout", (req, res) => {
    // Destroy the session
    req.session.destroy()
    res.status(200).json("logged out")
})

// This allows the server.js to import (require) the routes
// defined in this file.

// Create an endpoint for users when an id input at the end of the url path
router.get('/users/:id', (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0){
                res.status(200).json(results[0])
            } else {
                res.status(404).json('failed to get user by id!')
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json('failed to get user - query error')
        })
})

// This allows the server.js to import (require) the
// routes define in this file.
module.exports = router