class CreateBook {

    static libraryArray = [];

    constructor (title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    addBookToArray () {
        CreateBook.libraryArray.push(this);
        // this.id = CreateBook.libraryArray.indexOf(this);
    }
}

// Get input from user
class AddBook {

    static getBookInfo() {
        const title = document.getElementById("book-title").value;
        const author = document.getElementById("book-author").value;
        const pages = document.getElementById("book-total-page").value;

        new CreateBook(title, author, pages).addBookToArray();
    }

    static clearBookInputField() {
        document.getElementById("book-title").value = "";
        document.getElementById("book-author").value = "";
        document.getElementById("book-total-page").value = "";
    }
}

class ManageBook{

    constructor(){
        this.openBtn = document.getElementById("open-form");
        this.closeBtn = document.getElementById("close-form");
        this.dialog = document.getElementById("dialog")
        this.bookContainer = document.querySelector(".bookContainer");

        this.openBtn.addEventListener("click", () => {
            dialog.showModal();
        });
        
        this.closeBtn.addEventListener("click", () => {
            dialog.close();
        })

        document.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            AddBook.getBookInfo(); // Add the book
            AddBook.clearBookInputField();
            this.dialog.close(); // Close the dialog
            this.displayBook();
        });
    }


    displayBook () {
        this.bookContainer.innerHTML = '';

        for (let i = 0; i < CreateBook.libraryArray.length; i++) {
            // Create a new div to hold the book information
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book"); 
        
            // Create a paragraph for the title
            const title = document.createElement("p");
            title.classList.add("title");
            title.textContent = `${CreateBook.libraryArray[i].title}`; 
        
            // Create a paragraph for the author
            const author = document.createElement("p");
            author.classList.add("author");
            author.textContent = `By: ${CreateBook.libraryArray[i].author}`;
        
            // Create a paragraph for the pages
            const pages = document.createElement("p");
            pages.classList.add("total-page"); 
            pages.textContent = `${CreateBook.libraryArray[i].pages} pages`; 
    
            // Create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-book");
    
            // Create delete icon
            const trashIcon = document.createElement("img");
            trashIcon.classList.add("trashIcon");
            trashIcon.src = "./trash.png";
            trashIcon.alt = `Delete book ${CreateBook.libraryArray[i].title}`;
    
            // Append icon to delete button
            deleteBtn.appendChild(trashIcon);
     
            // Create delete function
            deleteBtn.addEventListener("click", () => {
                CreateBook.libraryArray.splice(i, 1);
                this.displayBook();
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
            this.bookContainer.appendChild(bookDiv);
        }
    }
}


const manageBook = new ManageBook();