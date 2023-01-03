// Selectors
const buttons = document.querySelectorAll("button");
const newBook = document.querySelector("#newbook");
const body = document.querySelector("body");
const mainWrapper = document.querySelector(".main-wrapper");
const addBookWindow = document.querySelector(".add-book-window");
const closeWindow = document.querySelector(".close");
const submitBook = document.querySelector('button[type="submit"]');
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');
const libraryContainer = document.querySelector('.library');

// Stores all created book objects.
let library = [];

// Book object constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function checkBookCount() {
    if(libraryContainer.children.length === 0) {
        const message = document.createElement("p");
        message.innerHTML = "You have no books in your library. Add some!";
        libraryContainer.appendChild(message);
    }
}

// Adds a book to the library list.
function addToLibrary(book) {
    library.push(book);
}

function hideAddBookWindow() {
    console.log("Clicked!");
    mainWrapper.style.opacity = "1";
    mainWrapper.style.pointerEvents = "auto";
    addBookWindow.style.display = "none";
}

submitBook.addEventListener("click", function (event) {
    event.preventDefault();

    let userTitle = titleInput.value;
    let userAuthor = authorInput.value;
    let userpages = pagesInput.value;
    let userRead = readInput.checked;

    let book = new Book(userTitle, userAuthor, userpages, userRead);
    addToLibrary(book);
});

closeWindow.addEventListener("click", hideAddBookWindow);

newBook.addEventListener("click", () => {
    // Dim the site
    mainWrapper.style.opacity = "0.05";
    // Disable clicking outside of the addBookWindow
    mainWrapper.style.pointerEvents = "none";
    // Display the adding book window
    addBookWindow.style.display = "block";
});

checkBookCount();
