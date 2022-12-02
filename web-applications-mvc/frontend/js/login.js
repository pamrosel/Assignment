// Post user login info
function postLoginUser() {
    // Get access to the login user form
    let loginUserForm = document.getElementById("login-user-form")
    // Convert the form fields into JSON. Line below hardly changes for forms 
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(loginUserForm)))
    // Post the form data to the backend 
    fetch("/api/users/login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        alert(res)
        // Client side redirect e.g. after user created 
        window.location.href = "list_users.html"
    })
    .catch(error => {
        console.log("user login failed - " + error)
    })
}