const page = document.querySelector('.page');

let myLibrary = [];

let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let read = document.getElementById("read");

document.querySelector(".submit").addEventListener('click', addBookToLibrary);



function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read)
        {
            return (`${this.title} by ${this.author}
            ${this.pages} pages
            Read`)
        }
        else
        {
            return (`${this.title} by ${this.author}
            ${this.pages} pages
            Not read yet`)
        }
    }
}

function display(book) {
    let container = document.createElement('div');
    container.className = "container";

    let info = document.createElement('p');
    info.className = 'info';
    info.textContent = book.info();

    // let title = document.createElement('p');
    // let author = document.createElement('p');
    // let pages = document.createElement('p');
    // let read = document.createElement('p');
    let removeBtn = document.createElement('button');

    // title.textContent = book.title;
    // author.textContent = book.author;
    // pages.textContent = book.pages;
    // book.read ? read.textContent = 'Read' : read.textContent = 'Have not read';
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove';
    removeBtn.addEventListener('click', remove)

    // container.appendChild(title);
    // container.appendChild(author);
    // container.appendChild(pages);
    // container.appendChild(read);
    container.appendChild(info);
    container.appendChild(removeBtn);

    return container;
}

function reload() {
    while (page.firstChild) {
        page.removeChild(page.lastChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        let container = display(myLibrary[i]);
        let index = document.createElement('p');
        index.className = 'index';
        index.textContent = i+1;

        container.appendChild(index);

        index.style.display = 'none';

        page.appendChild(container);
    }
}

function addBookToLibrary(book) {
    myLibrary.push(new Book(title.value, author.value, pages.value, read.checked));

    reload();

    console.log(read.checked);
    console.log(myLibrary);
}

function remove(e) {
    let container = e.target.parentNode;
    let index = container.querySelector('.index').textContent;

    myLibrary.splice(index-1, 1);

    reload();
}

