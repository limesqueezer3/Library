const library = new Library();
const controller = new Controller(library);
// add pseudo book
library.addBook("arthur's adventures", "dave", 45, true);



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
    const form = document.querySelector("form");
    

    this.updateDisplay = controller.updateView();


}