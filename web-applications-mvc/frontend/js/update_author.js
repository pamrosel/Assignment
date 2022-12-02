let urlParameters = new URLSearchParams(window.location.search)
// window.location.search is the params at the end of the url path 
// Access the author ID from the query string (ie. ?id=1)
let authorID = urlParameters.get("id")

// Fetch author information where authorID = ? to update  
if (authorID){
    fetch(`api/authors/${authorID}`) 
    // Boot up author id and their data in the form
        .then(res => res.json())
        .then(author => {
            console.log(author)
            // Push existing author info into the form inputs
            document.getElementById('authorID').value = author.authorID
            document.getElementById('name').value = author.name
            document.getElementById('surname').value = author.surname
            document.getElementById('nationality').value = author.nationality
            document.getElementById('birthYear').value = author.birthYear
            document.getElementById('deathYear').value = author.deathYear
        })
}

// Validate all form elements before executing postUpdateAuthor()
function validate(e) {
    let elementsToValidate = document.getElementById("update-author-form").elements
    let valid = true
    for (let element of elementsToValidate) {
        valid = valid && element.checkValidity()
    }

    if (valid === false) {
        console.log('display validation error for all fields')
        document.getElementById('validation-error').style.display = "block" 
        event.preventDefault()
    } else {
        postUpdateAuthor()
    }
}

// Post back updated data!
function postUpdateAuthor() {
    // Get access to the update author form
    let updateAuthorForm = document.getElementById('update-author-form')

    // Convert the form data into JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateAuthorForm)))
    console.log(formDataJSON)

    // Post the JSON data to the api
    fetch("api/authors/update", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'},
            body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        // Redirect back to author list
        window.location.href = "author_list.html"
    })
}