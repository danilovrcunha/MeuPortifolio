const cardsContainer = document.querySelector('.cards-container');
const restartBtn = document.getElementById('restart-btn');
const message = document.getElementById('message');
const attemptHistory = document.getElementById('attempt-history');

let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;
let gameStarted = false;
let roundFinished = false;

const images = [
    'assets/tubarao.png',
    'assets/leao.png',
    'assets/pato.png',
    'assets/tubarao.png',
    'assets/leao.png',
    'assets/pato.png',
];

function initGame() {
    message.textContent = '';
    matchedPairs = 0;
    attempts = 0;
    flippedCards = [];
    gameStarted = false;
    roundFinished = false;

    const shuffledImages = [...images].sort(() => 0.5 - Math.random());

    cardsContainer.innerHTML = '';
    shuffledImages.forEach((imageSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="front"></div>
            <div class="back">
                <img src="${imageSrc}" alt="card image">
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        cardsContainer.appendChild(card);
    });

    updateHistory();
}

function flipCard(card) {
    if (flippedCards.includes(card) || card.classList.contains('matched') || roundFinished) return;

    card.classList.add('flip');
    flippedCards.push(card);
    gameStarted = true;

    if (flippedCards.length === 2) {
        attempts++;
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstImage = firstCard.querySelector('.back img').src;
    const secondImage = secondCard.querySelector('.back img').src;

    if (firstImage === secondImage) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === images.length / 2) {
            endGame();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1000);
    }

    flippedCards = [];
}

function endGame() {
    if (!roundFinished) {
        message.textContent = '🎉 PARABÉNS! Você encontrou todos os pares! 🎉';
        saveAttempt(attempts);
        updateHistory();
        roundFinished = true;
    }
}

restartBtn.addEventListener('click', () => {
    if (gameStarted && !roundFinished) {
        saveAttempt(attempts);
    }
    initGame();
});

function updateHistory() {
    const history = JSON.parse(localStorage.getItem('attempts')) || [];
    attemptHistory.innerHTML = '';
    history.forEach((attempt, index) => {
        const li = document.createElement('li');
        li.textContent = `Rodada ${index + 1}: ${attempt} tentativas`;
        attemptHistory.appendChild(li);
    });
}

function saveAttempt(attempts) {
    const history = JSON.parse(localStorage.getItem('attempts')) || [];
    if (attempts > 0) history.push(attempts);
    localStorage.setItem('attempts', JSON.stringify(history));
}

initGame();
