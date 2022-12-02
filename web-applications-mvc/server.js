const express = require("express")
//access express module
const session = require("express-session") 

const server = express()
const port = 8081

// Enable middleware for JSON and urlencoded form data - when fetch or a form needed 
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Enable session middleware so that we have state! 
server.use(session({
    secret: "secret phrase abc123",
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false }
}))

// Access control middleware
server.use((req, res, next) => {
    // The user is logged in if they have session data
    let userLoggedIn = req.session.user != null

    // Define a list of allowed URLS for non-logged in users
    let allowedURLs = [
        "/login.html",
        "/js/login.js",
        "/css/style.css",
        "/api/users/login"
    ]

    // If the user is logged in
    if (userLoggedIn) {
        // Let them through
        next()
    } else {    
    // Else (they are not logged in)
        // Check if the URL they want is allowed 
        if (allowedURLs.includes(req.originalUrl)) {
            // Allow the guest user through
            next()
        } else {
            // If not allowed - redirect to the login page
            res.redirect("/login.html")
        }
    }
})

// let adminOnlyURLs = [
//     "/create_user.html",
//     "/api/users/create"
// ]

// Serve static frontend resources
// Needs to be before controllers and after middleware
server.use(express.static("frontend"))

// Link up book controller
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)

// Link up author controller
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

// Link up user controller
const userController = require("./backend/controllers/userController")
server.use("/api", userController)

// Start the express server *must come last
server.listen(port, () => {
    console.log("Backend listening on http://localhost:"+port)
})