const main = document.getElementsByTagName('main')[0];
const newBookBtn = document.getElementById('new-book-btn');
const xBtn = document.getElementById('x-btn');
const form = document.querySelector('#new-book-form');

//removes the form from screen
function removeForm() {
    console.log('X button clicked')
    form.style.display = "none";
    main.classList.remove('blur');
}

//makes new book form visible
newBookBtn.addEventListener('click', function () {
    console.log('New book button clicked')
    form.style.display = "grid";
    main.classList.add('blur');
});
//event handler for removing form from screen
xBtn.addEventListener('click', function () {
    removeForm();
});


//prevents page from reloading on form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();


    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;

    let read = document.getElementById('read');
    if(read.checked) {
        read = 'Yes';
    } else {
        read = 'No'
    }
    
    const book = new Book(title, author, pages, read);

    removeForm();
    addBookToLibrary(book);
    displayBooks();
});






let myLibary = [];

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//adds book to myLibrary array
function addBookToLibrary(book) {
    myLibary.push(book);
}

//populate main with book cards
function displayBooks() {
    main.innerHTML = '';
    for (let i = 0; i < myLibary.length; i++) {
        const book = myLibary[i];
        let card = document.createElement('div');
        card.classList.add("card");
        //adds book's properties to card
        card.append(addPropertyToCard(book.title));
        card.append(addPropertyToCard(book.author));
        card.append(addPropertyToCard(book.pages, 'Pages: '));
        card.append(addPropertyToCard(book.read, 'Read? '))
        //adds trash icon to card
        let trashIcon = createImageElement('media/delete.svg', 'trash icon');
        trashIcon.setAttribute('class', 'icon trash-icon');
        trashIcon.addEventListener('click', function(e){
            removeCardFromLibrary(i);
            displayBooks();
        });
        card.append(trashIcon);

        //adds book icon to card
        let bookIcon = createImageElement('media/book.svg', 'book icon');
        bookIcon.setAttribute('class', 'icon book-icon');
        bookIcon.addEventListener('click', function(e){
            toggleReadProperty(i);
            displayBooks();
        });
        card.append(bookIcon);
        
        //adds card to main element
        main.appendChild(card);
        
    }
}

//returns a paragraph element containing a book property and a preface if included
function addPropertyToCard(property, preface) {
    preface = preface || '';
    const para = document.createElement('p');
    para.textContent = preface + property;
    return para;
}

//return a input element of type image with an src and alt
function createImageElement(src, alt) {
    let image = document.createElement('input');
    image.setAttribute('type', 'image');
    image.setAttribute('src', src);
    image.setAttribute('alt', alt);
    return image;
}

//removes an element at index from myLibrary array
function removeCardFromLibrary(index) {
    myLibary.splice(index, 1);
}

//toggles read property in book at index in myLibrary array
function toggleReadProperty(index) {
    myLibary[index].read === 'Yes' ? myLibary[index].read = 'No' : myLibary[index].read = 'Yes';
}

addBookToLibrary(new Book("Song of Ice and Fire", "Author1", 123, 'Yes'));
addBookToLibrary(new Book("I am Legend", "Author2", 321, 'No'));
addBookToLibrary(new Book("American Psycho", "Author3", 666, 'No'));
displayBooks();

