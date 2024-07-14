const library = new Library();
const controller = new Controller(library);
const view = new View(controller);
// add pseudo book
library.addBook("arthur's adventures", "dave", 45, true);

const createBookButton = document.querySelector("#createBook");
const confirmBtn = document.querySelector("#confirmBtn");
const dialog = document.querySelector("#dialog");
const createBookForm = document.querySelector("form");
let book;


let output;

// "Show the dialog" button opens the <dialog> modally
createBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Cancel" button closes the dialog without 
//submitting because of [formmethod="dialog"], 
//triggering a close event.
dialog.addEventListener("close", (e) => {
    if (book) {
        controller.addBook(book.title, book.author, book.npages, book.read);
        controller.updateView();
    } 
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const nPages = document.querySelector('#nPages').value;
    const read = document.querySelector('#read').checked;
    book = {title, author, nPages, read};
    dialog.close(); 
    createBookForm.reset();
});

function Book (title, author, nPages, read) {
    this.title = title;
    this.author = author;
    this.nPages = nPages;
    this.read = read;
}

function Library() {
    this.myLibrary = [];

    this.addBook = function(title, author, nPages, read) {
        this.myLibrary.push(new Book(title, author, nPages, read));
    }

    this.removeBook = function(index) {
        this.myLibrary.splice(index, 1);
    }

    this.setRead = function(index, read) {
        this.myLibrary[index].read = read;
    }

    this.getLibrary = function() {
        return this.myLibrary;
    }
};

function Controller (library) {
    this.library = library;
    
    this.updateView = function () {
        const container = document.querySelector(".container");

        const books = this.library.getLibrary();
        for (let book of books) {
            const bookView = document.createElement("div");
            bookView.innerHTML = book.title;
            container.appendChild(bookView);
        }
    }
    this.addBook = function(title, author, nPages, read) {
        library.addBook(title, author, nPages, read)
    }

    this.removeBook = function(index) {
        library.removeBook(index);
    }

    this.setRead = function(index) {
        library.setRead(index);
    }

}

function View(controller) {
    this.controller = controller;
    this.updateDisplay = controller.updateView();
}

