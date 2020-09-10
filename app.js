// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');
  // creat tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href "#" class="delete">X<a></td>
  `;
  list.appendChild(row);
}

//  Show alert 
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  // add classes 
  div.className = `alert ${className}`;
  // Add text 
  div.appendChild(document.createTextNode(message));
  // Get a parent
  const container = document.querySelector('.container');
  // Get Form 
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);
  //  Timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();

  }
}

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event listeners ADD book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value
  // Instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate UI 
  const ui = new UI();
  // validate
  if (title === '' || author === '' || isbn === '') {
    //  error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success')
    // clear fields
    ui.clearFields();
  }
  e.preventDefault();
})

// Event listener for delete BOOK

document.getElementById('book-list').addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  // Show an alert 
  ui.showAlert('Book Removed', 'success')
  e.preventDefault();
})