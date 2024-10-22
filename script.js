const openBtn = document.getElementById("open-form");
const closeBtn = document.getElementById("close-form");
const dialog = document.getElementById("dialog")
const bookContainer = document.querySelector(".bookContainer");


// Enable the opening and closing of the dialog
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
    addBook(); // Add the book
    dialog.close(); // Close the dialog
    displayBook(libraryArray); // Display the updated library
});

// Display the book
 function displayBook(libraryArray) {

    // Clear initial display
    bookContainer.innerHTML = '';

    // Loop through the libraryArray to display each book
    for (let i = 0; i < libraryArray.length; i++) {
        // Create a new div to hold the book information
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book"); 
    
        // Create a paragraph for the title
        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = `${libraryArray[i].title}`; 
    
        // Create a paragraph for the author
        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = `By: ${libraryArray[i].author}`;
    
        // Create a paragraph for the pages
        const pages = document.createElement("p");
        pages.classList.add("total-page"); 
        pages.textContent = `${libraryArray[i].pages} pages`; 

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-book");

        // Create delete icon
        const trashIcon = document.createElement("img");
        trashIcon.classList.add("trashIcon");
        trashIcon.src = "./trash.png";
        trashIcon.alt = `Delete book ${libraryArray[i].title}`;

        // Append icon to delete button
        deleteBtn.appendChild(trashIcon);
 
        // Create delete function
        deleteBtn.addEventListener("click", () => {
            libraryArray.splice(i, 1);
            displayBook(libraryArray);
        });

        // Create a checkbox input
        const statusCheckbox = document.createElement("input");
        statusCheckbox.type = "checkbox";
        statusCheckbox.classList.add("statusCheckbox");

        // Track the read status
        let isRead = false;

        // Toggle status and background color on change
        statusCheckbox.addEventListener("change", () => {
            isRead = statusCheckbox.checked;
            statusCheckbox.style.backgroundColor = isRead ? "green" : "red"; // Change background color
        });
 
        // Append all paragraphs to the bookDiv
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(deleteBtn);
        bookDiv.appendChild(statusCheckbox);
    
        // Append the bookDiv to the bookContainer
        bookContainer.appendChild(bookDiv);
    }
}