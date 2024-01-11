import BookCollection from "./modules/bookcollection.js";
import {
  bookList,
  bookTemplate,
  bookForm,
  titleInput,
  authorInput,
  list,
  addNew,
  contactNav,
  displaySection,
  addBookSection,
  contactSection
} from './modules/variables.js';

const bookCollection = new BookCollection();

bookCollection.books.forEach((book) => bookCollection.displayBook(book));

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = titleInput.value;
  const bookAuthor = authorInput.value;
  if (!bookTitle || !bookAuthor) return;
  bookCollection.addBook(bookTitle, bookAuthor);
  titleInput.value = '';
  authorInput.value = '';
});

bookList.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('[data-button-delete]');
  if (!deleteButton) return;

  const parent = deleteButton.closest('#bookContainer');
  if (!parent) return;

  const bookId = parent.getAttribute('data-book-id');
  parent.remove();
  bookCollection.deleteBook(parseInt(bookId, 10));
});

list.addEventListener('click', () => {
  displaySection.classList.remove('hidden');
  addBookSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

addNew.addEventListener('click', () => {
  displaySection.classList.add('hidden');
  addBookSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
});

contactNav.addEventListener('click', () => {
  displaySection.classList.add('hidden');
  addBookSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
});