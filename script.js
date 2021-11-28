const page = document.querySelector('.page');

let myLibrary = [];

let title = document.getElementById("title");
let author = document.getElementById("author");
let pages = document.getElementById("pages");
let read = document.getElementById("read");
let rating = document.getElementById("rating");
let ratingLbl = document.querySelector('.rating');

read.addEventListener('click', () => {
    if (read.checked) {
        ratingLbl.style.display = '';
        rating.style.display = '';
    } 
    else {
        ratingLbl.style.display = 'none';
        rating.style.display = 'none';
    }
})


document.querySelector(".submit").addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.review = "";
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

    //Container for Title, Author, Pgs, Read status
    let info = document.createElement('div');
    info.className = 'info';

    //Container for Rating and Review
    let r = document.createElement('div');
    r.className = 'r';

    //Container for Buttons
    let btn = document.createElement('div');
    btn.className = 'btn';

    let title = document.createElement('p');
    title.className = 'title';
    let author = document.createElement('p');
    author.className = 'author';
    let pages = document.createElement('p');
    pages.className = 'pages';
    let read = document.createElement('p');
    read.className = 'read';
    let rating = document.createElement('div');
    let review = document.createElement('p');
    review.style.overflowY = 'scroll';

    let editBtn = document.createElement('button');
    let readBtn = document.createElement('button');
    let reviewBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    title.textContent = book.title;
    author.textContent = 'By ' + book.author;
    pages.textContent = book.pages + ' pgs';
    book.read ? read.textContent = 'Read' : read.textContent = 'Have not read';
    if (book.read) {
        rating = addStars(rating, book.rating);
    } 
    else {
        rating.textContent = "";  
    } 
    book.review ? review.textContent = "Review: " +book.review : null;

    editBtn.textContent = 'Edit';
    editBtn.className = 'editBtn';
    editBtn.addEventListener('click', toggleEdit);

    readBtn.textContent = 'Toggle Read';
    readBtn.className = 'readBtn';
    readBtn.addEventListener('click', toggleRead);
    
    reviewBtn.textContent = 'Review';
    reviewBtn.className = 'reviewBtn';
    reviewBtn.addEventListener('click', toggleReview);

    removeBtn.textContent = 'Remove';
    removeBtn.className = 'removeBtn';
    removeBtn.addEventListener('click', remove);

    info.appendChild(title);
    info.appendChild(author);
    info.appendChild(pages);
    info.appendChild(read);

    r.appendChild(rating);
    r.appendChild(review);
    
    btn.appendChild(readBtn);
    btn.appendChild(reviewBtn);
    btn.appendChild(removeBtn);
   
    container.appendChild(info);
    container.appendChild(r);
    container.appendChild(btn);

    return container;
}

function reload() {
    while (page.firstChild) {
        page.removeChild(page.lastChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        let container = display(myLibrary[i]);
        
        //Add index per myLibrary array to track
        //Remove styling to make invisible
        let index = document.createElement('p');
        index.className = 'index';
        index.textContent = i+1;
        container.appendChild(index);
        index.style.display = 'none';

        page.appendChild(container);
    }
}

function addBookToLibrary(book) {
    myLibrary.push(new Book(title.value, author.value, pages.value, read.checked, rating.value));

    reload();
}

function addStars(node, num) {
    for (let i = 0; i < num; i++)
    {
        let star = document.createElement('img');
        star.setAttribute("src", "images/star.png")
        star.style.height = '25px';
        star.style.weight = '25px';
        star.setAttribute('alt','star');

        node.appendChild(star);
    }
    node.style.gap = '4px';

    return node;;
}

function toggleEdit(e) {
//     let container = e.target.parentNode;
//     let index = container.querySelector('.index').textContent;

//     myLibrary[index-1]

}

function toggleRead(e) {
    let container = e.target.parentNode.parentNode;
    let index = container.querySelector('.index').textContent;
    
    console.log(container);
    console.log(index);

    let toggle = container.querySelector('#read');

    if (myLibrary[index-1].read) {
        myLibrary[index-1].read = false;
    } 
    else {
        myLibrary[index-1].read = true;
    }

    reload();
}

function toggleReview(e) {
    let container = e.target.parentNode.parentNode;
    let index = container.querySelector('.index').textContent;

console.log(container.querySelector('.index'));

    myLibrary[index-1].review = prompt("Leave your review here.", "What I learned in boating school is...");

    reload();
}

function remove(e) {
    let container = e.target.parentNode.parentNode;
    let index = container.querySelector('.index').textContent;

    myLibrary.splice(index-1, 1);

    reload();
}

