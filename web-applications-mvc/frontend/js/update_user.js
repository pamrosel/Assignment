let urlParameters = new URLSearchParams(window.location.search)
// window.location.search is the params at the end of the url path 
// Access the user ID from the query string (ie. ?id=1)
let userID = urlParameters.get("id")

// Get all user information where userID = ? 
if (userID){
    fetch(`api/users/${userID}`)
    // Boot up user id and their data in the form
        .then(res => res.json())
        .then(user => {
            console.log(user)
            // Push existing user info into the form inputs
            document.getElementById('UserID').value = user.userID
            document.getElementById('firstName').value = user.firstName
            document.getElementById('lastName').value = user.lastName
            document.getElementById('email').value = user.email
            document.getElementById('username').value = user.username
            document.getElementById('password').value = user.password
            document.getElementById('accessRights').value = user.accessRights
        })
}

// Validate all elements before executing postUpdateUser()
function validate(e) {
    let elementsToValidate = document.getElementById("update-user-form").elements
    let valid = true
    for (let element of elementsToValidate) {
        valid = valid && element.checkValidity()
    }
    
    if (valid === false) {
        event.preventDefault()
        console.log('display validation error for all fields')
        document.getElementById('validation-error').style.display = "block" 
    } else {
        postUpdateUser()
    }
}

// Post back updated data!
function postUpdateUser() {
    // Get access to the update user form
    let updateUserForm = document.getElementById('update-user-form')

    // Convert the form data into JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateUserForm)))
    console.log(formDataJSON)

    // Post the JSON data to the api
    fetch("api/users/update", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'},
            body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        // Redirect back to user list
        window.location.href = "list_users.html"
    })
}