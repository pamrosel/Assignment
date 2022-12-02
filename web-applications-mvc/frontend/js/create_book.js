// Call all book info to pull cover image info
fetch("/api/books")
    .then(res => res.json())
    .then((books) => {
        let coverImage = document.getElementById("coverImagePath")
        let currentCoverImage = document.getElementById("currentCoverImage")
        let coverSelect = document.getElementById("coverSelect")

        for (let book of books) {
            coverSelect.innerHTML += `<option value="${book.coverImagePath}">
                ${book.coverImagePath}
            </option>`
        }

        if (coverImage != null) {
            // console.log('cover image is not null')
            coverSelect.value = coverImage.value
            currentCoverImage.alt = coverImage.value
        }
})

// Call all author info to pull Author info
fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        console.log(authors)
        let authorSelect = document.getElementById("authorSelect")
        let currentAuthor = document.getElementById("authorID").value

        for (let author of authors) {
            authorSelect.innerHTML += `<option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }

        // console.log(currentAuthor)
        // console.log(authorSelect.value)
        if (currentAuthor != null) {
            // console.log('current author is not null')
            authorSelect.value = currentAuthor
        }
})

// Define a function for making the authorID field = authorSelect field 
function changeAuthor() {
    let authorSelect = document.getElementById("authorSelect")
    let currentAuthor = document.getElementById("authorID")

    if (authorSelect.value != currentAuthor.value){
        console.log('select does not equal current author')
        currentAuthor.value = authorSelect.value
    }
}

// Make the thumbnail = authorSelect field 
function changeCover() {
    let coverSelect = document.getElementById("coverSelect")
    let coverImage = document.getElementById("coverImagePath")
    let currentCoverImage = document.getElementById("currentCoverImage")

    if (coverSelect.value.length > 0){
        coverImage.value = coverSelect.value
        currentCoverImage.src = "images/book_covers/" + coverImage.value
        currentCoverImage.alt = coverImage.value
    }
}

// If updated, make the thumbnail = coverImage field 
function newCover() {
    let coverSelect = document.getElementById("coverSelect")
    let coverImage = document.getElementById("coverImagePath")
    let currentCoverImage = document.getElementById("currentCoverImage")

    if (coverImage != coverSelect) {
        currentCoverImage.src = 'images/book_covers/' + coverImage.value
        currentCoverImage.alt = coverImage.value
    }
}

// Validate all form elements before postCreateBook() executed
function validate(e) {
    let elementsToValidate = document.getElementById("create-book-form").elements
    let valid = true

    for (let element of elementsToValidate) {
        valid = valid && element.checkValidity()
    }

    if (valid === false) {
        console.log('display validation error for all fields')
        document.getElementById('validation-error').style.display = "block" 
        event.preventDefault()
    } else {
        postCreateBook()
    }
}

// Post new book information to server to create book 
function postCreateBook() {
    // Get access to the create book form element
    let createBookForm = document.getElementById('create-book-form')
    // Convert the book form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createBookForm)));
    // Post form data to the API
    fetch("/api/books/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
    })
    .then(res => res.json())
    .then(res => {
        // handle response from server
        console.log('Create book request sent!');
        alert('Book Created')
        // Redirect back to book list
        window.location.href = "book_list.html"
        // hide loading screen!
    })
    .catch(err => {
        // handle the error from the server 
        console.log('Create book request failed! ' + err)
    })
}