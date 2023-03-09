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

    persons = await getJSON('/json/persons.json');

    displayPersons();

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

        id, firstName, lastName, email, phone, age, hobby

    }) => /*html*/`
    <hr>
    <div class="container-fluid">
      <!--ROW ONE-->
      <div id="ROWJS" class="book-row row" style="text-align: center;">
        <div class="book-col col-xl-4">
          <img width="200px" src="images/js2.jpg">
          <p id="book0" class="book-name">Bookname Lorem ipsum dolor sit amet, consecte</p>
          <p id="author0" class="book-author">Bookname Lorem ipsum dolor sit amet, consecte</p>
          <p class="price">$<span id="price0">29</span> &nbsp;<button class="buy-btn btn btn-success">Add to Cart</button>
          </p>
        </div>
        <div class="book-col col-xl-4">
          <img width="200px" src="images/js2.jpg">
          <p id="book1" class="book-name">Bookname Lorem ipsum dolor sit am</p>
          <p id="author1" class="book-author">Bookname Lorem ipsum dolor sit amet, consecte</p>
          <p class="price">$<span id="price1">29</span> &nbsp;<button class="buy-btn btn btn-success">Add to Cart</button>
          </p>
        </div>
        <div class="book-col col-xl-4">
          <img width="200px" src="images/js2.jpg">
          <p id="book2" class="book-name">Bookname Lorem ipsum dol</p>
          <p id="author2" class="book-author">Bookname Lorem ipsum dolor sit amet, consecte</p>
          <p class="price">$<span id="price2">29</span> &nbsp;<button class="buy-btn btn btn-success">Add to Cart</button>
          </p>
  
        </div>
      </div>
    

  `);

    document.querySelector('.personList').innerHTML = htmlArray.join('');

}


start();
