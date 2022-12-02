// Get url parameters (query string)
let urlParameters = new URLSearchParams(window.location.search)

// Access the author ID from the query string (ie. ?id=1)
let authorID = urlParameters.get("id")

// Delete an author 
function postDeleteAuthor() {
    // Check that a author ID was specified
    if (authorID) {
        // Post the JSON data to the API
        fetch("api/authors/delete", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({authorID: authorID})
        })
        .then(res => res.json())
        .then(response => {
            // Redirect back to author list
            window.location.href = "author_list.html"
        })
    }
}