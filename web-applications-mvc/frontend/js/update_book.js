let urlParameters = new URLSearchParams(window.location.search)
// window.location.search is the params at the end of the url path 
// Access the book ID from the query string (ie. ?id=1)
let bookID = urlParameters.get("id")

// Get book information where id = ? 
if (bookID){
    fetch(`api/books/${bookID}`)
    // Boot up book id and their data in the form
        .then(res => res.json())
        .then(book => {
            console.log(book)
            // Push existing book info into the form inputs
            document.getElementById('bookID').value = book.bookID
            document.getElementById('bookTitle').value = book.bookTitle
            document.getElementById('originalTitle').value = book.originalTitle
            document.getElementById('yearofPublication').value = book.yearofPublication
            document.getElementById('genre').value = book.genre
            document.getElementById('millionsSold').value = book.millionsSold
            document.getElementById('languageWritten').value = book.languageWritten
            document.getElementById('coverImagePath').value = book.coverImagePath
            document.getElementById('currentCoverImage').src = "images/book_covers/" + book.coverImagePath
            document.getElementById('coverImagePath').alt = book.coverImagePath
            document.getElementById('authorID').value = book.authorID
        })
}

// Get all book information to pull cover image info 
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
            console.log('cover image is not null')
            coverSelect.value = coverImage.value
            currentCoverImage.alt = coverImage.value
        }
})

// Make sure coverSelect = coverImage value 
function changeCover() {
    let coverSelect = document.getElementById("coverSelect")
    let coverImage = document.getElementById("coverImagePath")
    let currentCoverImage = document.getElementById("currentCoverImage")

    if (coverSelect.value != coverImage.value){
        coverImage.value = coverSelect.value
        currentCoverImage.src = "images/book_covers/" + coverImage.value
        currentCoverImage.alt = coverImage.value
    }
}

// Fetch all author information to pull Author name from ID 
fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("authorSelect")
        let currentAuthor = document.getElementById("authorID").value

        for (let author of authors) {
            authorSelect.innerHTML += `<option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }

        console.log(currentAuthor)
        console.log(authorSelect.value)

        if (currentAuthor != null) {
            console.log('current author is not null')
            authorSelect.value = currentAuthor
        }
})

// Make sure authorSelect = authorID value 
function changeAuthor() {
    let authorSelect = document.getElementById("authorSelect")
    let currentAuthor = document.getElementById("authorID")

    if (authorSelect.value != currentAuthor.value){
        console.log('select does not equal current author')
        currentAuthor.value = authorSelect.value
    }
}

// Make sure thumbnail = coverSelect 
function newCover() {
    let coverSelect = document.getElementById("coverSelect")
    let coverImage = document.getElementById("coverImagePath")
    let currentCoverImage = document.getElementById("currentCoverImage")

    if (coverImage != coverSelect) {
        currentCoverImage.src = 'images/book_covers/' + coverImage.value
        currentCoverImage.alt = coverImage.value
    }
}

// Validate all elements before executing postUpdateBook()
function validate(e) {
    let elementsToValidate = document.getElementById("update-book-form").elements
    let valid = true

    for (let element of elementsToValidate) {
        valid = valid && element.checkValidity()
    }

    if (valid === false) {
        console.log('display validation error for all fields')
        document.getElementById('validation-error').style.display = "block" 
        event.preventDefault()
    } else {
        postUpdateBook()
    }
}

// Post back updated data!
function postUpdateBook() {
    // Get access to the update book form
    let updateBookForm = document.getElementById('update-book-form')

    // Convert the form data into JSON string
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(updateBookForm)))
    console.log(formDataJSON)

    // Post the JSON data to the api
    fetch("api/books/update", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'},
            body: formDataJSON
    })
    .then(res => res.json())
    .then(response => {
        alert(response)
        // Redirect back to book list
        window.location.href = "book_list.html"
    })
}