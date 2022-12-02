// Get url parameters (query string)
let urlParameters = new URLSearchParams(window.location.search)

// Access the user ID from the query string (ie. ?id=1)
let userID = urlParameters.get("id")

// Delete user
function postDeleteUser() {
    // Check that a user ID was specified
    if (userID) {
        // Post the JSON data to the API
        fetch("api/users/delete", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID: userID})
        })
        .then(res => res.json())
        .then(response => {
            // Redirect back to user list
            window.location.href = "list_users.html"
        })
    }
}