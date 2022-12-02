// Fetch changelog information to populate user-log-list
fetch("api/books/userlog")
    .then(response => response.json())
    .then(userlogs => {
        console.log(userlogs)
        let user_log_list = document.getElementById("user-log-list")        

        for (let userlog of userlogs) {
            user_log_list.innerHTML += `
                <article>
                    <h3 id="userlog-book-title">${userlog.bookTitle}</h3>
                    <ul>
                        <li>Last Updated By User: ${userlog.username} - ${userlog.lastName}, ${userlog.firstName} </li> 
                        <li>Last Updated: ${userlog.dateChanged.substring(0, 10)} ${userlog.dateChanged.substring(11, 19)}</li>                        
                        <li>Book Created: ${userlog.dateCreated.substring(0, 10)} ${userlog.dateCreated.substring(11, 19)}</li>                        
                        <li>Book ID: ${userlog.bookID}</li>
                    </ul>
                </article>
            `
        }
    })

