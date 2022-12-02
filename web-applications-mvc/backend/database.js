// Import mysql2 module so we can talk to the database 
const mysql = require("mysql2")

// Create a connection to the database (pool is mysql object creates multiple connections to connect as needed)
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    // password: "root",
    database: "books"
})

// This wrapper will allow the use of promise functions
// like .then() and .catch() so that we can use it in an async
// way along with expressJS

// function query() { - same as line below 
// query on left is the function, query on right is the sql (now 'sql')
const query = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

// export the new query function so that the models can use it
module.exports = { query }