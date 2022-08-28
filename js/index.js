import cards from '../data/mythicCards/index.js';
import ancients from '../data/ancients.js';

// let easyGreen = [];
// let normalGreen = [];
// let hardGreen = [];

// cards.greenCards.forEach((element) => {
//     if(element.difficulty === 'easy') {
//         easyGreen.push(element);
//     } else if(element.difficulty === 'normal') {
//         normalGreen.push(element);
//     } else {
//         hardGreen.push(element);
//     }
// });

// let easyBrown = [];
// let normalBrown = [];
// let hardBrown = [];

// cards.brownCards.forEach((element) => {
//     if(element.difficulty === 'easy') {
//         easyBrown.push(element);
//     } else if(element.difficulty === 'normal') {
//         normalBrown.push(element);
//     } else {
//         hardBrown.push(element);
//     }
// });

// let easyBlue = [];
// let normalBlue = [];
// let hardBlue = [];

// cards.blueCards.forEach((element) => {
//     if(element.difficulty === 'easy') {
//         easyBlue.push(element);
//     } else if(element.difficulty === 'normal') {
//         normalBlue.push(element);
//     } else {
//         hardBlue.push(element);
//     }
// });

const shuffleDeck = document.querySelector('.shuffle-deck');
const cardBlock = document.querySelector('.card-wrapper');
let choiceAncients 
let level

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
})

let setColorCard = (colorCards) => {
    let deck = [];
    while(deck.length < (choiceAncients.firstStage[colorCards] + choiceAncients.secondStage[colorCards] + choiceAncients.thirdStage[colorCards])){
        let z = cards[colorCards][Math.floor(Math.random()*cards[colorCards].length)];
        if(!deck.includes(z)) {
            deck.push(z)
        }
    }
    return deck
}

let mixCards = () => {
    let deck =[]

}

const currents = document.querySelectorAll('.dot');
let firstStageDeck
let secondStageDeck
let thirdStageDeck
let deck

shuffleDeck.addEventListener('click', () => {
    cardBlock.classList.add('show');
    shuffleDeck.classList.remove('show');

    let green = setColorCard('greenCards');
    let brown = setColorCard('brownCards');
    let blue = setColorCard('blueCards');

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

    deck = [].concat(firstStageDeck, secondStageDeck, thirdStageDeck);
})

const playCard = document.querySelector('.play-card')

document.querySelector('.cover-card').addEventListener('click', () => {
    playCard.classList.add('show')
});