
let aDeckImages = ["auri_queen.jpg", "elodin_joker.jpg", "kilvin_king.jpg", "king.jpg", "devi_queen.jpg", "denna_queen.jpg", "kvothe_joker.jpg", "ambrose_joker.jpg", "fela_queen.jpg"]

const pairs = aDeckImages.length

// Hide Winscreen
$("#winScreen").hide()
$("#darken").hide()

// Reload page on "play again"
$("#playAgain").click(function () {
    $("#winScreen").hide()
    location.reload();
});


let gaDeck = generateDeck();
gaDeck = shuffle(gaDeck);
popUI(gaDeck);


// Make deck
function generateDeck() {

    let Deck = [], i = 0

    //Make 18 pairs 
    for (i = 0; i < pairs; i++) {

        let card1 = {
            value: i,
            id: `${i}a`,
            class: `card-${i}`
        };

        Deck.push(card1)

        let card2 = {
            value: i,
            id: `${i}b`,
            class: `card-${i}`
        };

        Deck.push(card2)
    }

    return Deck;
}

// Shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Makes HTML for the cards and places them out on the UI
function popUI(deck) {

    let game = document.querySelector('.gamearea'), cardBack, cardFront

    deck.forEach(card => {

        let el = document.createElement('div');
        el.classList.add(card.class);
        el.classList.add('cards');

        cardBack = `<img data-value="${card.value}" class="back"src="./img/cardback.jpg" alt="back" draggable="false">`
        cardFront = `<img data-value="${card.value}" class="front"src="./img/${aDeckImages[card.value]}" alt="front" draggable="false">`
        el.innerHTML = cardBack + cardFront

        game.appendChild(el);
    });
}

let gcards = document.querySelectorAll(`.cards`)
let gCard1Value = null
let gCard2Value = null
let gFlipped = []
let gPlayer1Score = 0
let gPlayer2Score = 0
let gCurrentPlayer = 1

//Listen for "Click" on each card
gcards.forEach(card => {
    card.addEventListener(`click`, (e) => {

        let activeCard = e.target;
        let cardValue = activeCard.getAttribute('data-value');

        // Se if the card has allready been clicked
        if (card.classList.contains(`clicked`) === true) {
            // No Operation Performed
        }
        else if (gCard1Value === null) {

            gCard1Value = cardValue
            // Toggle class "clicked" to make the card turn 180 degrees
            card.classList.toggle(`clicked`)

            gFlipped.push(activeCard)
        }
        else if (gCard2Value === null) {

            gCard2Value = cardValue

            // Toggle class "clicked" to make card turn 180 degrees
            card.classList.toggle(`clicked`)

            // Put active card in the array "gFlipped"
            gFlipped.push(activeCard)

            // Compare cards 
            if (gCard1Value === gCard2Value) {

                // Add 1 to current players score
                if (gCurrentPlayer === 1) {
                    gPlayer1Score += 1
                    document.getElementById(`score1`).innerHTML = `<h1>Score: ${gPlayer1Score}<h1>`

                } else {
                    gPlayer2Score += 1
                    document.getElementById(`score2`).innerHTML = `<h1>Score: ${gPlayer2Score}<h1>`
                }

                // Show win screen if all cards are found
                if (gPlayer1Score + gPlayer2Score >= pairs) {
                    if (gPlayer1Score > gPlayer2Score) {
                        $("#winText").text("Player 1 Won!!")
                    } else if (gPlayer1Score < gPlayer2Score) {
                        $("#winText").text("Player 2 Won!!")
                    } else {
                        $("#winText").text("It was a tie!!")
                    }
                    $("#darken").show()
                    $("#winScreen").show()
                    //  card.classList.toggle(`clicked`)
                }

            } else {
                // Run the function "flipBack" using the "gFlipped" array to only flip back the two currently selected cards
                setTimeout(flipBack, 1000, gFlipped)

                //Change current player and set new drop shadow in the UI
                if (gCurrentPlayer === 1) {
                    gCurrentPlayer = 2
    
                    document.getElementById('currentPlayer2').innerText = "Current Player"
                    document.getElementById("player_2").style.boxShadow = "0 0px 8px 0 rgb(255, 145, 0), 0 0 50px 0 rgb(255, 145, 0)"

                    document.getElementById('currentPlayer1').innerHTML = "&nbsp;"
                    document.getElementById("player_1").style.boxShadow = "0 0px 10px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.555)"

                } else {
                    gCurrentPlayer = 1
                    document.getElementById('currentPlayer1').innerText = "Current Player"
                    document.getElementById("player_1").style.boxShadow = "0 0px 8px 0 rgb(255, 145, 0), 0 0 50px 0 rgb(255, 145, 0)"

                    document.getElementById('currentPlayer2').innerHTML = "&nbsp;"
                    document.getElementById("player_2").style.boxShadow = "0 0px 10px 0 rgba(0, 0, 0, 0.2), 0 0 20px 0 rgba(0, 0, 0, 0.555)"

                }
            }

            gFlipped = []
            gCard1Value = null
            gCard2Value = null
        }
    })
})

// Flip back all cards in the array "flipped"
function flipBack(flipped) {
    flipped.forEach(back => {

        back.parentNode.classList.remove("clicked")
    })
} 