/*
 * Create a list that holds all of your cards
 */

 arrays = [
   "fa-diamond", "fa-diamond",
   "fa-paper-plane-o", "fa-paper-plane-o",
   "fa-anchor", "fa-anchor",
   "fa-bolt", "fa-bolt",
   "fa-cube", "fa-cube",
   "fa-leaf", "fa-leaf",
   "fa-bicycle", "fa-bicycle",
   "fa-bomb", "fa-bomb"
 ];

/*
 *Creating varbiales
 */

 const deck = document.querySelector('.deck');
 const starNum = document.querySelector('.stars');
 const moveNum = document.querySelector('.moves');
 const everyCard = document.getElementsByClassName('card');

 let timeCounter = document.getElementById('time-counter'),
   s = 0,
   m = 0,
   h = 0;
 let move = 0;
 let open = [];
 let match = [];
 let everyStar = document.getElementsByClassName('fa-star');
 b = "";

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*
 * Creates shuffled deck
 */
 const generate = function() {
   let shuffledArrays = shuffle(arrays);
   let fragment = document.createDocumentFragment();
   arrays.forEach(function createCard(array) {
     let li = document.createElement('li');
     li.classList = "card";
     li.innerHTML = `<i class="fa ${array}"></i>`
     fragment.appendChild(li);
   });
   deck.appendChild(fragment);
 }

/*
 * The timer for the game
 */
 let timer = function myTimer() {
   s++;
   if (s >= 60) {
     s = 0;
     m++;
     if (m >= 60) {
       m = 0;
       h++;
     }
   }
   timeCounter.textContent = `${h > 9 ? h : "0" + h} : ${m > 9 ? m : "0" + m} : ${s > 9 ? s : "0" + s}`;
   setTimeout(myTimer, 1000);
 }

/*
 * move counter function
 */

 const moveCounter = function() {
   move++;
   moveNum.innerHTML = move <= 1 ? move + " Move" : move + " Moves";
 }

/*
 * Move function affects starCounter function
 */
 const starCounter = function() {
   if (move === 14) {
     starNum.firstElementChild.outerHTML = "";
   }
   if (move === 19) {
     starNum.firstElementChild.outerHTML = "";
   }
 }

 let blinking = function() {
   if (move >= 14 && move < 19) {
     b = starNum.classList.toggle('blink-1');
     b++;
     return b;
   }
 }

 let blinking2 = function() {
   if (move >= 19 && move < 24) {
     starNum.classList.remove('blink-1');
     b = starNum.classList.toggle('blink-2');
     b++;
     return b;
   }
   if (move === 24) {
     starNum.classList.remove('blink-3');
     b = starNum.classList.toggle('blink-3');
     b++;
     return b;
   }
 }

/*
 * victory function that displays message after all cards are matched
 */
 const victory = function() {
   if (document.getElementsByClassName('match').length === 16) {
     let gameEnd = Date.now();
     let gameTime = gameEnd - gameStart;
     let gameTimeTemp = gameTime / 1000;
     gameTimeTemp >= 10 ? totalTime = (gameTimeTemp / 60).toFixed(2) + " minutes" : totalTime = gameTimeTemp.toFixed(0) + " seconds";

     setTimeout(function() {
       window.alert("Congratulations! It took you " + totalTime + " to finish the game! And your rating was " + everyStar.length + (everyStar.length === 1 ? " star" : " stars") + "!\n\nPlay again?");
     }, 800);

     setTimeout(function() {
       restart();
     }, 2000);
   };
 }

/*
 * Restart buttons function
 */
 const restart = function() {
   //resets all data and regeneates a random deck
   s = 0;
   m = 0;
   h = 0;
   move = 0;
   deck.innerHTML = "";
   starNum.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
   moveNum.innerHTML = "0 Moves";

   open.splice(0, open.length);
   match.splice(0, match.length);
   starNum.classList.remove('blink-1', 'blink-2', 'blink-3');

   generate();
   game();
 }

 const game = function() {
   for (let i = 0; i < everyCard.length; i++) {
     everyCard.item(i).addEventListener('click', function() {
       if (!open.includes(everyCard.item(i))) {
         open.splice(0, 0, everyCard.item(i));
         open[0].classList.add("open", "show");
         if (open.length === 2) {
           moveCounter();
           starCounter();
           if ((open[0].firstChild.outerHTML === open[1].firstChild.outerHTML)) {
 						match = open.slice();
 						match[0].classList.add("match", "disabled");
 						match[1].classList.add("match", "disabled");
 						open[0].classList.remove("open", "show");
 						open[1].classList.remove("open", "show");
 						match[0].classList.remove("open", "show");
 						match[1].classList.remove("open", "show");
 						open.splice(0, 2);
             victory();
           }
           window.addEventListener('click', function() {
             if (open.length > 2) {
               open[0].classList.remove("open", "show");
               open[1].classList.remove("open", "show");
               open[2].classList.remove("open", "show");
               open.splice(0, 3);
             }
           });
         }
       }
     });
   }
 }

 let gameStart = Date.now();

 generate();
 setTimeout(timer, 1000);
 setInterval(blinking, 1900);
 setInterval(blinking2, 600);
 game();
 document.querySelector('.restart').addEventListener('click', restart);
