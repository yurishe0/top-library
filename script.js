// Selectors
const buttons = document.querySelectorAll("button");
const newBook = document.querySelector("#newbook");
const body = document.querySelector("body");
const mainWrapper = document.querySelector(".main-wrapper");
const addBookWindow = document.querySelector(".add-book-window");
const closeWindow = document.querySelector(".close");

// Stores all created book objects.
let library = [];

// Book object constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Adds a book to the library list.
function addToLibrary() {

}

function hideAddBookWindow() {
    console.log("Clicked!");
    mainWrapper.style.opacity = "1";
    mainWrapper.style.pointerEvents = "auto";
    addBookWindow.style.display = "none";
}


closeWindow.addEventListener("click", hideAddBookWindow);

newBook.addEventListener("click", () => {
    // Dim the site
    mainWrapper.style.opacity = "0.05";
    // Disable clicking outside of the addBookWindow
    mainWrapper.style.pointerEvents = "none";
    // Display the adding book window
    addBookWindow.style.display = "block";
})
