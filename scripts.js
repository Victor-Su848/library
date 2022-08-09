const main = document.getElementsByTagName('main')[0];
const newBookBtn = document.getElementById('new-book-btn');
const xBtn = document.getElementById('x-btn');
const form = document.querySelector('#new-book-form');

function removeForm() {
    console.log('X button clicked')
    form.style.display = "none";
    main.classList.remove('blur');
}

//makes new book form visible
newBookBtn.addEventListener('click', function () {
    console.log('New book button clicked') 
    form.style.display = "flex";
    main.classList.add('blur');
});
//removes the form
xBtn.addEventListener('click', function(){
    removeForm();
});


//prevents page from reloading on form submit
form.addEventListener('submit', function(e){
    e.preventDefault();
    

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;
    const book = new Book(title, author, pages, read);

    removeForm();
    addBookToLibrary(book);
    displayBooks();
});
    





let myLibary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibary.push(book);
}

function displayBooks() {
    main.innerHTML = '';
    for (let i = 0; i < myLibary.length; i++) {
        console.log(myLibary[i]);

        let bookDiv = document.createElement('div');
        bookDiv.classList.add("card");
        bookDiv.style.border = "1px solid red";

        let bookTitle = document.createElement('p');
        let bookAuthor = document.createElement('p');
        let bookPages = document.createElement('p');
        let bookRead = document.createElement('p');


        bookTitle.textContent = myLibary[i].title;
        bookAuthor.textContent = myLibary[i].author;
        bookPages.textContent = myLibary[i].pages;
        bookRead.textContent = myLibary[i].read;

        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(bookRead);

        main.appendChild(bookDiv);
    }
}

addBookToLibrary(new Book("Book1", "Author1", 123, true));
addBookToLibrary(new Book("Book2", "Author2", 321, false));
addBookToLibrary(new Book("Book3", "Author3", 666, true));
displayBooks();