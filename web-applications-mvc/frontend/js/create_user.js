// Validate all form elements before postCreateUser() executed
function validate(e) {
    let elementsToValidate = document.getElementById("create-user-form").elements
    let valid = true
    for (let element of elementsToValidate) {
        valid = valid && element.checkValidity()
    }
    
    if (valid === false) {
        event.preventDefault()
        console.log('display validation error for all fields')
        document.getElementById('validation-error').style.display = "block" 
    } else {
        postCreateUser()
    }
}

// Send form information to create a user 
function postCreateUser() {
    // Get access to the create user form element
    let createUserForm = document.getElementById('create-user-form')
    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createUserForm)));
    // Post form data to the API
    fetch("/api/users/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
    })
    .then(res => res.json())
    .then(res => {
        // handle response from server
        
        console.log('Create user request sent!')
        if(res == "admin only section"){
        alert(res)}
        else {alert('User Created!')}
        window.location.href = "list_users.html"
    })
    .catch(err => {
        // handle the error from the server 
        console.log('Create user request failed! ' + err)
    })
}