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
const libraryContainer = document.querySelector(".library");

// Stores all created book objects.
let library = [];

// Book object constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.changeReadStatus = function () {
  if (this.isRead == true) {
    this.isRead = false;
  } else if (this.isRead == false) {
    this.isRead = true;
  }
};

function checkBookCount() {
  if (libraryContainer.children.length === 0) {
    const message = document.createElement("p");
    message.innerHTML = "You have no books in your library. Add some!";
    libraryContainer.appendChild(message);
  }
}

// Adds a book to the library list.
function addToLibrary(book) {
  if (!this.title || !this.author || !this.pages) {
    console.log("The fields can not be left empty!");
  }

  library.push(book);
}

function getArrayIndex(book) {
  return library.indexOf(book);
}

function updateLibrary() {
  libraryContainer.innerHTML = "";

  library.forEach((book) => {
    let bookIndex = getArrayIndex(book);
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
    });

    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(read);
    bookContainer.appendChild(close);
  });
}

function hideAddBookWindow() {
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
  updateLibrary();
  hideAddBookWindow();
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
