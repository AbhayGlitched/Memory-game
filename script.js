// Initialize variables
let moveCount = 0;
const moveCounter = document.querySelector('.move-counter');
const resetButton = document.querySelector('.reset-button');
const title = document.querySelector('.title');
const cards = []; 
for (let i = 0; i < 4; i++) {
    cards[i] = [];
    for (let j = 0; j < 4; j++) {
        cards[i][j] = document.querySelector(`#c${i}_${j}`);
    }
}

const emogis = ['😀', '🎉', '❤️', '🌟', '🚀', '🐱', '🌈', '😎'];
const pairedEmogis = [...emogis, ...emogis];

// Shuffle cards fpr -- hell difficulty
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Set up board
function setupBoard() {
    shuffle(pairedEmogis);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            cards[i][j].innerHTML = pairedEmogis[i * 4 + j];
            cards[i][j].classList.remove('hidden', 'flipped', 'matched');
            cards[i][j].addEventListener('click', handleCardClick);
        }
    }
    moveCount = 0;
    moveCounter.textContent = `Moves: ${moveCount}`;
    title.innerHTML = "Memory Game";
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Flip card - beacause why not
function flipCard(card) {
    card.classList.remove('hidden');
    card.classList.add('flipped');
}

// Reset variables for next turn-- woh completeky normal step - right - why i make this a function then?
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Handle card click - very hard logic - turns out easy afterall
function handleCardClick(event) {
    const card = event.currentTarget;
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

    flipCard(card);
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;
        moveCount++;
        moveCounter.textContent = `Moves: ${moveCount}`;

        if (firstCard.innerHTML === secondCard.innerHTML) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetBoard();

            if (checkAllMatched()) {
                title.innerHTML += "<br>You Won!";
            }
        } else {
            setTimeout(() => {
                firstCard.classList.add('hidden');
                firstCard.classList.remove('flipped');
                secondCard.classList.add('hidden');
                secondCard.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }
}

// Check if all cards are matched -- you won written in the code
function checkAllMatched() {
    return Array.from(document.querySelectorAll('.card')).every(card =>
        card.classList.contains('matched')
    );
}

// Reset button functionality
resetButton.addEventListener('click', setupBoard);

// Initialize board on page load
setupBoard();
