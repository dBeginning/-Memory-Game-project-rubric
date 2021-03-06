/*
 * Create a list that holds all of your cards
 */

 const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
* Gamimg...
*/

function gameStart(){
    // Create cards
    for(let i = 0; i < icons.length; i++) {

        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        // Call card click event for each card
        click(card);
    }
}

/*
* Your move
*/

function click(card) {
     // Card click event
     card.addEventListener("click", function() {

        let currentCard = this;
        let previousCard = openedCards[0];

        // Opened card
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            //Call compare function
            compare(currentCard, previousCard);
        } 
        else {
            // NO cards Opened
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
        }

        
    });
}


/*
*Compare between two cards
*/
function compare (currentCard, previousCard){

 // Compare cards
 if (currentCard.innerHTML === previousCard.innerHTML) {

     // matched
     currentCard.classList.add("match");
     previousCard.classList.add("match");

     matchedCards.push(currentCard, previousCard);

     openedCards = [];

     // Game over
     gameOver();

 } else {

     // unmatched
     setTimeout(function() {
         currentCard.classList.remove("open", "show", "disable");
         previousCard.classList.remove("open", "show", "disable");
         openedCards = [];
     }, 500);
     
 }

 //Add new move
 addMove();
}

/*
* Alert user for game over
*/
function gameOver() {
    if (matchedCards.length === icons.length) {
        alert("YOU WON!");
    }
}

/*
* Moves
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove(){
    moves++
    movesContainer.innerHTML = moves;

    //Rating
    rating();
}

/*
* Rating
*/
const starsContainer = document.querySelector(".stars");
function rating() {
    switch(moves) {
        case 15:
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
        break;

        case 20:
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        break;
    }
}


/*
* Reset game
*/
const restartGame = document.querySelector(".restart");
restartGame.addEventListener("click", function() {
    //Clear cards
    cardsContainer.innerHTML = "";

    //Call gameStart to create new cards
    gameStart();

    //Clear matchedCards
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;

    //Call shuffle function
    shuffle(icons);
})

// Start game
gameStart();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
