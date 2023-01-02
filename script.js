// Stores all created book objects.
let library = [];

// Book object constructor
function Book() {

}

// Adds a book to the library list.
function addToLibrary() {

}

// Selectors
const buttons = document.querySelectorAll("button");
const newBook = document.querySelector("#newbook");
const body = document.querySelector("body");
const mainWrapper = document.querySelector(".main-wrapper");

newBook.addEventListener("click", () => {
    // Dim the site
    mainWrapper.style.opacity = "0.2";
    // Disable clicking outside of the addBookWindow
    mainWrapper.style.pointerEvents = "none";
    // Create an element for adding books and add it to the site
    const addBookWindow = document.createElement("div");
    addBookWindow.classList.add("add-book-window");
    body.appendChild(addBookWindow);


})
