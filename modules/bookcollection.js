import { bookTemplate, bookList } from './variables.js';

class BookCollection {
  constructor() {
    this.books = this.loadBooks();
    this.bookId = this.books.length + 1;
  }

  /* eslint-disable class-methods-use-this */
  loadBooks() {
    return JSON.parse(localStorage.getItem('Books')) || [];
  }
  /* eslint-enable class-methods-use-this */

  saveBooks() {
    localStorage.setItem('Books', JSON.stringify(this.books));
  }

  // eslint-disable no-alert
  deleteBook(bookId) {
    const confirmed = window.confirm('Are you sure you want to remove this book?');
    if (!confirmed) {
      return;
    }

    this.books = this.books.filter((book) => book.id !== bookId);
    this.saveBooks();
    window.alert('Book removed!');
  }

  displayBook(book) {
    const templateClone = bookTemplate.content.cloneNode(true);
    const bookTitle = templateClone.querySelector('#book-title');
    const bookAuthor = templateClone.querySelector('#book-author');
    const bookContainer = templateClone.querySelector('#bookContainer');
    bookContainer.dataset.bookId = book.id;
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    if (this.books.indexOf(book) % 2 === 0) bookContainer.classList.add('bg-gray');
    bookList.appendChild(templateClone);
  }

  addBook(title, author) {
    const newBook = {
      id: this.bookId,
      title: `"${title}"`,
      author,
    };
    this.books.push(newBook);
    this.displayBook(newBook);
    this.saveBooks();
    this.bookId += 1;
  }
}

export default BookCollection;