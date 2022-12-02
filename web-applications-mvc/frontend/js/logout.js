// Logout a user 
function postLogoutUser() {
    fetch("/api/users/logout", {
        method: "POST",
    })
    .then(res => res.json())
    .then(res => {
        alert(res)
        window.location.href = "login.html"
    })
    .catch(error => {
        console.log("logout failed - " + error)
    })
}