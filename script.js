const openBtn = document.getElementById("open-form");
const closeBtn = document.getElementById("close-form");
const submitBtn = document.getElementById("submit-form");
const dialog = document.getElementById("dialog")
const bookContainer = document.querySelector(".bookContainer");


// Controls inside the dialog
openBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
})


// Hold the information about the books in an array
let libraryArray = [];

function CreateBook (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

CreateBook.prototype.addBook = function () {
    libraryArray.push(this);
    this.id = libraryArray.indexOf(this);
}

// Turn form input into array data
function addBook () {
    const titleInput = document.getElementById("book-title").value;
    const authorInput = document.getElementById("book-author").value;
    const pagesInput = document.getElementById("book-total-page").value;

    //Use the CreateBook constructor to add the book
    const newBook = new CreateBook(titleInput, authorInput, pagesInput);

    //Use the prototype to push the key value pair to the array
    newBook.addBook();

    //Clear the input 
   document.getElementById("book-title").value = "";
   document.getElementById("book-author").value = "";
   document.getElementById("book-total-page").value = "";
}


// Initiate the 'upload' of the form input into the array data and automatically close the dialog
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (document.getElementById("book-title").value && 
        document.getElementById("book-author").value && 
        document.getElementById("book-total-page").value) {
        
        addBook(); // Add the book
        dialog.close(); // Close the dialog
        displayBook(libraryArray); // Display the updated library

    } else {
        // This block won't be reached if required fields are empty due to the `required` attribute.
        alert('Please fill in all required fields.'); 
    }
});


// Display the book
 function displayBook(libraryArray) {

    bookContainer.innerHTML = '';

    // Loop through the libraryArray to display each book
    for (let i = 0; i < libraryArray.length; i++) {
        // Create a new div to hold the book information
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book"); 
    
        // Create a paragraph for the title
        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = `Title: ${libraryArray[i].title}`; 
    
        // Create a paragraph for the author
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = `Author: ${libraryArray[i].author}`;
    
        // Create a paragraph for the pages
        const pages = document.createElement("p");
        pages.classList.add("book-total-page"); 
        pages.textContent = `Pages: ${libraryArray[i].pages}`; 

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-book");
        deleteBtn.textContent = 'Delete';
 
        // Create delete function
        deleteBtn.addEventListener("click", () => {
            libraryArray.splice(i, 1);
            displayBook(libraryArray);
        });

        //Create status button
        const statusBtn = document.createElement("button");
        statusBtn.classList.add("status-book");
        statusBtn.textContent = "Mark as Read";
        let isRead = false;
        
        // Toggle the status on button click
        statusBtn.addEventListener("click", () => {
            isRead = !isRead; // Toggle the boolean value
            statusBtn.textContent = isRead ? "Mark as Unread" : "Mark as Read"; // Update the button text
            statusBtn.style.backgroundColor = isRead ? "green" : "red"; // Optional: Change background color
        });
        
        // Append the status button to the bookDiv
        bookDiv.appendChild(statusBtn);

 
        // Append all paragraphs to the bookDiv
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(deleteBtn);
    
        // Append the bookDiv to the bookContainer
        bookContainer.appendChild(bookDiv);
    }
}