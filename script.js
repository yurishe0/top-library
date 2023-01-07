// Selectors
const buttons = document.querySelectorAll("button");
const newBook = document.querySelector("#newbook");
const body = document.querySelector("body");
const mainWrapper = document.querySelector(".main-wrapper");
const addBookWindow = document.querySelector(".add-book-window");
const closeWindow = document.querySelector(".close");
const submitBook = document.querySelector('button[type="submit"]');
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const libraryWrapper = document.querySelector(".library-container");
const libraryContainer = document.querySelector(".library");
const clearButton = document.querySelector("#clearall");

// Stores all created book objects
let library = [];

// Book object constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Handles the change of the read status
Book.prototype.changeReadStatus = function () {
  if (this.isRead == true) {
    this.isRead = false;
  } else if (this.isRead == false) {
    this.isRead = true;
  }
};

// Display a message on screen that there are no books in the library yet
function checkBookCount() {
  if (library.length == 0) {
    const message = document.createElement("p");
    message.innerHTML = "You have no books in your library. Add some!";
    libraryContainer.appendChild(message);
  }
}

// Adds a book to the library list.
function addToLibrary(book) {
  if (!book.title || !book.author || !book.pages) {
    generateError("You have to fill all the fields to add a book!");
    return;
  } else {
    clearError();
    library.push(book);
  }
}

function generateError(errorContent) {
  clearError();
  let errorContainer = document.createElement("div");
  let errorMessage = document.createElement("p");

  errorMessage.innerHTML = errorContent;
  errorContainer.classList.add("error");

  errorContainer.appendChild(errorMessage);
  libraryWrapper.appendChild(errorContainer);
}

function clearError() {
  let currentError = document.querySelector(".error");
  if (currentError != null) {
    currentError.remove();
  }
}

// Reverts the opacity to normal and enables buttons after a book has been added
function hideAddBookWindow() {
  mainWrapper.style.opacity = "1";
  mainWrapper.style.pointerEvents = "auto";
  addBookWindow.style.display = "none";

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;
}

// Refreshesh the library, generates all books one per one from the library[] array
function updateLibrary() {
  libraryContainer.innerHTML = "";

  library.forEach((book) => {
    let bookIndex = library.indexOf(book);
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.setAttribute("data-index", bookIndex);
    libraryContainer.appendChild(bookContainer);

    const title = document.createElement("h2");
    title.innerHTML = book.title;

    const author = document.createElement("h3");
    author.innerHTML = book.author;

    const pages = document.createElement("p");
    pages.innerHTML = book.pages;

    const read = document.createElement("button");
    if (book.isRead == true) {
      read.innerHTML = "Read!";
      read.classList.add("read");
    } else {
      read.innerHTML = "Not read!";
      read.classList.add("not-read");
    }

    read.addEventListener("click", () => {
      library[bookIndex].changeReadStatus();
      updateLibrary();
    });

    const close = document.createElement("button");
    close.classList.add("book-close");
    close.addEventListener("click", () => {
      library.splice(bookContainer.getAttribute("data-index"), 1);
      updateLibrary();
      checkBookCount();
    });

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(close);
  });
}

function clearLibrary() {
  library = [];
  updateLibrary();
  checkBookCount();
}

// Creates a new object with the given data and refreshes the library.
submitBook.addEventListener("click", function (event) {
  event.preventDefault();

  let userTitle = titleInput.value;
  let userAuthor = authorInput.value;
  let userpages = pagesInput.value;
  let userRead = readInput.checked;

  let book = new Book(userTitle, userAuthor, userpages, userRead);

  addToLibrary(book);
  updateLibrary();
  checkBookCount();
  hideAddBookWindow();
});

closeWindow.addEventListener("click", hideAddBookWindow);

clearButton.addEventListener("click", clearLibrary);

// Dims the site, displays the 'add book' window and disables buttons in the background.
newBook.addEventListener("click", () => {
  mainWrapper.style.opacity = "0.05";
  mainWrapper.style.pointerEvents = "none";
  addBookWindow.style.display = "block";
});

// Displays the message about no books being in the library upon entering the site
checkBookCount();
