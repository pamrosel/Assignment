BRISK Publishing App 
Developer: Pamela Rosel 
Year Created: 2021

—

// Login Credentials 

Staff: 
username: gregro
password: newpass123

Admin: 
username: klak
password: abc123 

—

// Site Entry Instructions

1. Open the ‘web-applications-mvc’ folder in VS Code 
2. In the terminal run ‘npm start’ 
3. Navigate to https://localhost:8081/login.html 
4. Use the above credentials to log in as a staff or admin

—

// User Considerations while using Brisk App:

Please take note that: 
RE: Adding/Updating a Book
- A book cannot be created/updated to include an author that does not exist
- Input authors first before books 

RE: Adding an Author
- If an author is still alive, the Death Year input will not accept an empty value
- Input the number 0 in this case

RE: Adding/Updating Book Cover Image 
- Cover images that can be selected from the dropdown menu are existing book covers in the database
- These URL paths match image file paths in the ‘frontend/images/book_covers/‘ folder
- Inputting your own book cover is possible, however the image file must be in the directory above
- Simply input the exact name of the file e.g. ‘thumbnail.gif’ or ‘hobbit.jpg’ 
