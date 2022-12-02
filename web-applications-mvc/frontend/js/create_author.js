// Validate all form elements and throw validation error before postCreateAuthor() executed
function validate(e) {
    let elementsToValidate = document.getElementById("create-author-form").elements
    let valid = true
    for (let element of elementsToValidate) {
        valid = valid && element.checkValidity()
    }

    if (valid === false) {
        console.log('display validation error for all fields')
        document.getElementById('validation-error').style.display = "block" 
        event.preventDefault()
    } else {
        postCreateAuthor()
    }
}

// Create an Author on submit 
function postCreateAuthor() {
    // Get access to the create book form element
    let createAuthorForm = document.getElementById('create-author-form')
    // Convert the book form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createAuthorForm)));
    // Post form data to the API
    fetch("/api/authors/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
    })
    .then(res => res.json())
    .then(res => {
        // handle response from server
        alert('Author Created!')
        console.log('Create author request sent!');
        window.location.href = "author_list.html"
        // hide loading screen!
    })
    .catch(err => {
        // handle the error from the server 
        console.log('Create author request failed! ' + err)
    })
}