// elintarvikkeet
const foodItems = [
    { name: "Omena", calories: 52, img: "kuvat/omena.png" },
    { name: "Banaani", calories: 89, img: "kuvat/banaani.png"},
    { name: "Maito (1%)", calories: 42, img: "kuvat/maito.png"},
    { name: "Ruisleipä", calories: 220, img: "kuvat/ruisleipa.png"},
    { name: "Keitetty peruna", calories: 86, img: "kuvat/peruna.png" },
    { name: "Kananmuna", calories: 155, img: "kuvat/munat.png" },
    { name: "Broilerinfilee (paistettu)", calories: 165,  img: "kuvat/broilerinfilee.png" },
    { name: "Lohi (paistettu)", calories: 206,  img: "kuvat/lohifile.png" },
    { name: "Keitetty riisi", calories: 130,  img: "kuvat/riisi.png" },
    { name: "Juustohampurilainen", calories: 300,  img: "kuvat/juustohampurilainen.png" }
];

let currentFood = {};
let usedFoodItems = []; 
let score = 0; 
let round = 0;
const maxRounds = 5; 

const foodItemElement = document.getElementById('food-item');
const guessInput = document.getElementById('guess');
const resultElement = document.getElementById('result');
const playAgainButton = document.getElementById('play-again');
const submitGuessButton = document.getElementById('submit-guess');
const scoreElement = document.createElement('p');


scoreElement.textContent = `Pisteet: ${score}`;
document.querySelector('.container').appendChild(scoreElement);

function newGame() {
    if (round >= maxRounds) {
        endGame();
        return;
    }

    round++;
    resultElement.textContent = "";
    guessInput.value = "";
    guessInput.disabled = false;
    submitGuessButton.disabled = false;
    playAgainButton.style.display = "none";

    let remainingItems = foodItems.filter(item => !usedFoodItems.includes(item.name));
    if (remainingItems.length === 0) {
        endGame();
        return;
    }
    currentFood = remainingItems[Math.floor(Math.random() * remainingItems.length)];
    usedFoodItems.push(currentFood.name);

    foodItemElement.textContent = currentFood.name;

    // Näytä kuva
    const foodImageElement = document.getElementById('food-image');
    foodImageElement.src = currentFood.img;  // Päivittää kuvan lähteen
    foodImageElement.alt = currentFood.name;  // Kuvan alt-teksti
}

function checkGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        resultElement.textContent = "Anna numeroarvo!";
        return;
    }

    const actualCalories = currentFood.calories;
    const difference = Math.abs(guess - actualCalories);

    if (difference <= 10) {
        score += 2;
        resultElement.textContent = `Täysin oikein tai hyvin lähellä! ${currentFood.name} sisältää ${actualCalories} kcal. Saat 2 pistettä.`;
    } else if (difference <= 50) {
        score += 1;
        resultElement.textContent = `Melkein oikein! ${currentFood.name} sisältää ${actualCalories} kcal. Saat 1 pisteen.`;
    } else {
        resultElement.textContent = `Väärin. ${currentFood.name} sisältää ${actualCalories} kcal. Et saanut pisteitä.`;
    }

    scoreElement.textContent = `Pisteet: ${score}`;

    guessInput.disabled = true;
    submitGuessButton.disabled = true;

    if (round < maxRounds) {
        playAgainButton.style.display = "inline-block";
    } else {
        endGame();
    }
}

function endGame() {
    resultElement.textContent = `Peli ohi! Keräsit ${score} pistettä. Kiitos pelaamisesta!`;
    foodItemElement.textContent = "";
    guessInput.disabled = true;
    submitGuessButton.disabled = true;
    playAgainButton.style.display = "none";

    // Tallennetaan pisteet session storageen
    tallennaSessionStorageen("kaloripeliPisteet", score);
}

submitGuessButton.addEventListener('click', checkGuess);
playAgainButton.addEventListener('click', newGame);

newGame();
