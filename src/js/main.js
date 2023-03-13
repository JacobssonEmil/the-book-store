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

async function displayInformation(id) {
    const result = await getDataArray();
    id--;

    const title = result[id].title;
    const price = result[id].price;
    const description = result[id].description;
    const category = result[id].category;
    const image = result[id].image
    const author = result[id].author
    let htmlArray = `<button id="backBtn" class="btn btn-danger" style="width: 200px; height: 100%">Home</button>
        <div class="book-row">
            <img class="book-image" src="${image}">
            <h5 class="book-title">${title}</h5>
            <p class="book-author">${author}</p>
            <p class="book-category"><span class="book-category-header">Category: </span>${category}</p>
            <p class="book-description">${description}</p>
            <p class="book-price">$${price}<button id="${id}" class="book-button btn btn-success">Add to Cart</button></p>
        </div>`
    document.querySelector('.book-list').innerHTML = htmlArray;
    btn = document.getElementById(`${id}`);
    btn.addEventListener("click", addToCart);
    btn.myParam = btn.id;
    btn.myParam++;

    backBtn = document.getElementById("backBtn")
    backBtn.addEventListener("click", displayPersons);

}


function displayPersons() {
    // filter according to hobby and call displayPersons
    let filteredBooks = persons.filter(
        ({ hobby }) => chosenHobbyFilter === 'all'
            || chosenHobbyFilter === hobby
    );

    if (chosenSortOption === 'Last name') { sortByLastName(filteredBooks); }
    if (chosenSortOption === 'Age') { sortByAge(filteredBooks); }

    let htmlArray = filteredBooks.map(({
        id, title, author, description, category, price, image
    }) => /*html*/`
        <div class="col-lg-3 col-md-4 col-sm-6 book-row">
            <img class="book-image" src="${image}">
            <h5 class="book-title">${title}</h5>
            <p class="book-author">${author}</p>
            <p class="book-category"><span class="book-category-header">Category: </span>${category}</p>
            <p class="book-price">$${price}<button id="${id}" class="book-button btn btn-success">Add to Cart</button></p>
        </div>
    `);

    document.querySelector('.book-list').innerHTML = htmlArray.join('');


    // add event listener to each book title
    // add event listener to each book title
    let bookRows = document.querySelectorAll('.book-row');
    bookRows.forEach((row) => {
        let title = row.querySelector('.book-title');
        title.addEventListener('click', () => {
            // get the id of the book
            const id = row.querySelector('.book-button').id;
            displayInformation(id)
        });
    });

    // add event listener to each "Add to Cart" button
    let elements = document.querySelectorAll('.book-button');
    elements.forEach((element) => {
        element.addEventListener("click", addToCart);
        element.myParam = element.id;
    });
}


async function getDataArray() {
    const url = '/json/books.json'; // replace with your JSON endpoint URL

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // data is the JSON object returned from the API
            const dataArray = [];
            dataArray.push(...data); // add the data to the dataArray
            return dataArray;
        })
        .catch(error => console.error(error));
}

let cart = []
let itemsInCart = {}
let totalPrice = 0;

async function addToCart(evt) {
    const myInt = parseInt(evt.currentTarget.myParam) - 1;
    const result = await getDataArray();

    const title = result[myInt].title;
    const price = result[myInt].price;
    if (title in itemsInCart) {
        // If the item already exists in the cart, increment its quantity
        itemsInCart[title][1]++;
    } else {
        // Otherwise, add a new item to the cart
        itemsInCart[title] = [price, 1];
    }

    cart.push(myInt);

    totalPrice += price;

}


//document.getElementById('viewCartButton').addEventListener("click", viewCart)


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("viewCartButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = async function () {
    let cartArray = [];
    for (let title in itemsInCart) {
        const price = itemsInCart[title][0];
        const quantity = itemsInCart[title][1];
        const rowSum = price * quantity;
        const htmlString = `
        <div class="col-lg-3 col-md-4 col-sm-6 book-row">
          <h5 class="book-title">${title}</h5>
          <p class="book-price">Price: $${price}</p>
          <p class="book-row-sum">Subtotal: $${rowSum}</p>
          <p class="book-quantity"><span class="cart-amount-header">Quantity:</span> ${quantity}</p>
        </div><hr>
    `;
        cartArray.push(htmlString);

    }
    cartArray.push(`<p style="text-align:right"><span style="font-weight: bold">Total: </span>$${totalPrice}</p>`);

    document.getElementById('modal-text').innerHTML = cartArray.join('');
    modal.style.display = "block"

};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

start();
