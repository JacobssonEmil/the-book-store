// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getJSON } from './utils/getJSON';


let persons,

    chosenHobbyFilter = 'all',

    chosenSortOption,

    hobbies = [];


async function start() {

    persons = await getJSON('/json/books.json');

    displayPersons();

}

function viewCart() {
    var booksInCart = []
}
function addToCart(id) {
    alert("jeje")
}

function displayPersons() {

    // filter according to hobby and call displayPersons

    let filteredPersons = persons.filter(

        ({ hobby }) => chosenHobbyFilter === 'all'

            || chosenHobbyFilter === hobby

    );

    if (chosenSortOption === 'Last name') { sortByLastName(filteredPersons); }

    if (chosenSortOption === 'Age') { sortByAge(filteredPersons); }

    let htmlArray = filteredPersons.map(({

        id, title, author, description, category, price, image

    }) => /*html*/`
    <div class="col-lg-3 book-row">
        <img class="book-image" src="${image}">
        <h5 class="book-title">${title}</h1>
        <p class="book-author">${author}</p>
        <p class="book-price">$${price}<button class="book-button btn btn-success">Add to Cart</button></p>
        
    </div>
   
  `);

    document.querySelector('.book-list').innerHTML = htmlArray.join('');
}

start();
