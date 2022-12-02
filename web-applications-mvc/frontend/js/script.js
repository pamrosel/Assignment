// Fetch modular header.html for every page
fetch('modules/header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header').innerHTML = html
    })

// Fetch current user information for their username and accessRights 
fetch("/api/users/current")
    .then(res => res.json())
    .then(user => {
        // Push existing book info into the form inputs
        document.getElementById('logged-username').innerHTML = user.username
        document.getElementById('logged-accessrights').innerHTML = user.accessRights
    })

// Responsive header menu toggles up and down on pressing book icon
function toggleMenu() {
    let menubg = document.getElementById('header')
    let nav1 = document.getElementById('nav')
    let nav2 = document.getElementById('sub-nav')

    if (window.getComputedStyle(nav1).opacity === "0") {
        menubg.style.height = "210px"
        nav1.style.opacity = "1"
        nav2.style.opacity = "1"
    } else {
        nav1.style.opacity = "0"
        nav2.style.opacity = "0"
        menubg.style.height = "44px"
    }
}






// if (links.attr('href') == currentPage)
// $('#nav li a').each(function() {
//     var currentHref = $(this).attr('href');
//     if(currentHref == currentPage) {
//         $(this).addClass("active");
//     }
// })