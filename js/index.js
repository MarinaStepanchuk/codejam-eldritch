import cards from '../data/mythicCards/index.js';
import ancients from '../data/ancients.js';

const shuffleDeck = document.querySelector('.shuffle-deck');
const cardBlock = document.querySelector('.card-wrapper');
const playCard = document.querySelector('.play-card');
const coverCard = document.querySelector('.cover-card');
let choiceAncients 
let level
let currentCards = 0;
let levelCards

document.querySelector('.ancient').addEventListener('click', (event) => {
    shuffleDeck.classList.remove('show');
    cardBlock.classList.remove('show');
    event.target.classList.add('scale')
    ancients.forEach((elem) => {
        if(event.target.id === elem.id) {
            choiceAncients = elem;
        }
    })
});

document.querySelector('select').addEventListener('click', (event) => {
    level = event.target.value;
    cardBlock.classList.remove('show');
    shuffleDeck.classList.add('show');
    levelCards = {};
    let selectionCardsColor = [];
    currentCards = 0;
    switch(level) {
        case 'veryLight':
            for (let colorDeck in cards) {
                selectionCardsColor = cards[colorDeck].filter( (item) => {
                    return (item.difficulty === 'easy' || item.difficulty === 'normal') && item
                })
                levelCards[colorDeck] = selectionCardsColor;
            }
            break
        case 'light':
            for (let colorDeck in cards) {
                selectionCardsColor = cards[colorDeck].filter( (item) => {
                    return (item.difficulty === 'easy' || item.difficulty === 'normal') && item
                })
                levelCards[colorDeck] = selectionCardsColor;
            }
            break;
        case 'average':
            levelCards = cards;
            break;
        case 'complicated':
            for (let colorDeck in cards) {
                selectionCardsColor = cards[colorDeck].filter( (item) => {
                    return (item.difficulty === 'normal' || item.difficulty === 'hard') && item
                })
                levelCards[colorDeck] = selectionCardsColor;
            }
            break;
        default:
            alert('Уровень не задан, выберите уроень сложности.');
            shuffleDeck.classList.remove('show');
    }
})

let mixCards = (lengthDeck, sortedDeck) => {
    let deck = [];
    while(deck.length < lengthDeck){
        let z = sortedDeck[Math.floor(Math.random()*sortedDeck.length)];
        if(!deck.includes(z)) {
            deck.push(z);
        }
    }
    return deck
}

const currents = document.querySelectorAll('.dot');
let firstStageDeck
let secondStageDeck
let thirdStageDeck
//------
// let deck
//------
let deckMix

shuffleDeck.addEventListener('click', () => {
    cardBlock.classList.add('show');
    shuffleDeck.classList.remove('show');
    coverCard.classList.remove('hidden');
    playCard.classList.remove('show');

    let totalGreen = choiceAncients.firstStage.greenCards + choiceAncients.secondStage.greenCards + choiceAncients.thirdStage.greenCards;
    let totalBrown = choiceAncients.firstStage.brownCards + choiceAncients.secondStage.brownCards + choiceAncients.thirdStage.brownCards;
    let totalBlue = choiceAncients.firstStage.blueCards + choiceAncients.secondStage.blueCards + choiceAncients.thirdStage.blueCards;
    
    let green = mixCards(totalGreen,levelCards.greenCards);
    let brown = mixCards(totalBrown,levelCards.brownCards);
    let blue = mixCards(totalBlue,levelCards.blueCards);

    let totalCards = [
        choiceAncients.firstStage.greenCards, choiceAncients.firstStage.brownCards, choiceAncients.firstStage.blueCards,
        choiceAncients.secondStage.greenCards, choiceAncients.secondStage.brownCards, choiceAncients.secondStage.blueCards,
        choiceAncients.thirdStage.greenCards, choiceAncients.thirdStage.brownCards, choiceAncients.thirdStage.blueCards
    ];

    for (let i = 0; i < currents.length; i++) {
        currents[i].innerHTML = totalCards[i];
    };

    firstStageDeck = [].concat(
        green.slice(0,totalCards[0]),
        brown.slice(0,totalCards[1]),
        blue.slice(0,totalCards[2])
    );

    secondStageDeck = [].concat(
        green.slice(totalCards[0],totalCards[0] + totalCards[3]),
        brown.slice(totalCards[1],totalCards[1] + totalCards[4]),
        blue.slice(totalCards[2],totalCards[2] + totalCards[5])
    );

    thirdStageDeck = [].concat(
        green.slice(totalCards[0] + totalCards[3],totalCards[0] + totalCards[3] + totalCards[6]),
        brown.slice(totalCards[1] + totalCards[4],totalCards[1] + totalCards[4] + totalCards[7]),
        blue.slice(totalCards[2] + totalCards[5],totalCards[2] + totalCards[5] + totalCards[8])
    );
    //------------
    // deck = [].concat(firstStageDeck, secondStageDeck, thirdStageDeck)
    //-------------

    deckMix = [].concat(mixCards(firstStageDeck.length,firstStageDeck), mixCards(secondStageDeck.length,secondStageDeck), mixCards(thirdStageDeck.length,thirdStageDeck));
})



let decreaseCounter = (currentNumber, color) => {
    if(currentNumber < firstStageDeck.length) {
        for (let i = 0; i < 3; i++) {
            if(currents[i].classList.contains(color)) {
                currents[i].innerHTML -= 1;
            }
        };
    } else if (currentNumber < (firstStageDeck.length + secondStageDeck.length)) {
        for (let i = 3; i < 6; i++) {
            if(currents[i].classList.contains(color)) {
                currents[i].innerHTML -= 1;
            }
        };
    } else {
        for (let i = 6; i < 9; i++) {
            if(currents[i].classList.contains(color)) {
                currents[i].innerHTML -= 1;
            }
        };
    }
}

coverCard.addEventListener('click', () => {
    if(currentCards < deckMix.length) {
        playCard.src = `/assets/MythicCards/${deckMix[currentCards].color}/${deckMix[currentCards].id}.png`;
        playCard.classList.add('show');
        decreaseCounter(currentCards, deckMix[currentCards].color)
        currentCards += 1;
    } else {
        coverCard.classList.add('hidden');
        currentCards = 0;
    }
});








let easyGreen = [];
let normalGreen = [];
let hardGreen = [];

cards.greenCards.forEach((element) => {
    if(element.difficulty === 'easy') {
        easyGreen.push(element);
    } else if(element.difficulty === 'normal') {
        normalGreen.push(element);
    } else {
        hardGreen.push(element);
    }
});

let easyBrown = [];
let normalBrown = [];
let hardBrown = [];

cards.brownCards.forEach((element) => {
    if(element.difficulty === 'easy') {
        easyBrown.push(element);
    } else if(element.difficulty === 'normal') {
        normalBrown.push(element);
    } else {
        hardBrown.push(element);
    }
});

let easyBlue = [];
let normalBlue = [];
let hardBlue = [];

cards.blueCards.forEach((element) => {
    if(element.difficulty === 'easy') {
        easyBlue.push(element);
    } else if(element.difficulty === 'normal') {
        normalBlue.push(element);
    } else {
        hardBlue.push(element);
    }
});