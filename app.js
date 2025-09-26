let myLibrary = [];

function Book(title, author, pages, readStatus = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  myLibrary.push(this);
}
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="book-details">
      <p class="name">${book.title}</p>
      <p class="author">${book.author}</p>
      <p class="pages">${book.pages} pages</p>
    </div>
    <div class="icon-button">
      <button class="deleteBtn">
        <svg class="icon icon-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>trash-can</title>
          <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
        </svg>
      </button>
      <button class="readBtn">
        <svg class="icon icon-eyeOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>eye-outline</title>
          <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"/>
        </svg>
        <svg class="icon icon-eyeClosed hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>eye-off</title>
          <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"/>
        </svg>
      </button>
    </div>
  `;

  document.getElementById("card-container").appendChild(card);

  function setupDeleteButton(deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      const card = this.parentNode.parentNode;
      card.remove();
    });
  }

  function setupReadButton(readBtn) {
    readBtn.addEventListener("click", function () {
      const eyeOpen = this.querySelector(".icon-eyeOpen");
      const eyeClosed = this.querySelector(".icon-eyeClosed");
      eyeOpen.classList.toggle("hidden");
      eyeClosed.classList.toggle("hidden");
    });
  }

  const existingDeleteBtns = document.querySelectorAll(".deleteBtn");
  existingDeleteBtns.forEach(setupDeleteButton);

  const existingReadBtns = document.querySelectorAll(".readBtn");
  existingReadBtns.forEach(setupReadButton);
}

const addNewBtn = document.getElementById("add-new");
const popupOverlay = document.getElementById("popup-overlay");
const closeBtn = document.getElementById("close-popup");
const form = document.getElementById("popup-form");

addNewBtn.addEventListener("click", () => {
  popupOverlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  popupOverlay.classList.add("hidden");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();

  if (!title || !author || !pages) {
    alert("Please fill in all fields.");
    return;
  }

  const newBook = new Book(title, author, pages);
  createCard(newBook);

  popupOverlay.classList.add("hidden");
  form.reset();
});
