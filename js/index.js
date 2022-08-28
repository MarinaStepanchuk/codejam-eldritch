import cards from '../data/mythicCards/index.js';
import ancients from '../data/ancients.js';

const azathoth = document.querySelector('.azathoth');
const cthulthu = document.querySelector('.cthulthu');
const iogSothoth = document.querySelector('.iogSothoth');
const shubNiggurath = document.querySelector('.shubNiggurath');

const ancient = document.querySelector('.ancient');

//----------------

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

// const stageContainer = document.querySelector('.stage-container')
// const currentState1 = document.querySelector('.state1').children[1];
// const currentState2 = document.querySelector('.state2').children[1];
// const currentState3 = document.querySelector('.state3').children[1];

const shuffleDeck = document.querySelector('.shuffle-deck');
const cardBlock = document.querySelector('.card-wrapper');
let choiceAncients 
let level

ancient.addEventListener('click', (event) => {
    shuffleDeck.classList.remove('show');
    cardBlock.classList.remove('show');

    event.target.classList.add('scale')
    ancients.forEach((elem) => {
        if(event.target.id === elem.id) {
            choiceAncients = elem;
        }
    })
    // let counter = [];
    // for (key in currentState1) {
    //     key.innerHTML = 
    // }
    // currentState1.children[0].innerHTML = choiceAncients.firstStage.greenCards
    // console.log(currentState1.children[1].children[0].innerHTML)
});

document.querySelector('select').addEventListener('click', (event) => {
    level = event.target.value;
    cardBlock.classList.remove('show');
    shuffleDeck.classList.add('show');
})

let setColorCard = (colorCards) => {
    let deck = [];
    while(deck.length < (choiceAncients.firstStage[colorCards] + choiceAncients.secondStage[colorCards] + choiceAncients.thirdStage[colorCards])){
        let i = cards[colorCards][Math.floor(Math.random()*cards[colorCards].length)];
        if(!deck.includes(i)) {
            deck.push(i)
        }
    }
    return deck
}

shuffleDeck.addEventListener('click', () => {
    cardBlock.classList.add('show');
    shuffleDeck.classList.remove('show');

    let green = setColorCard('greenCards');
    let brown = setColorCard('brownCards');
    let blue = setColorCard('blueCards');

    let firstStageDeck = [].concat(green.slice(0,choiceAncients.firstStage.greenCards),brown.slice(0,choiceAncients.firstStage.brownCards),blue.slice(0,choiceAncients.firstStage.blueCards));
    let secondStageDeck = [].concat(green.slice(choiceAncients.firstStage.greenCards,(choiceAncients.firstStage.greenCards + choiceAncients.secondStage.greenCards)),brown.slice(choiceAncients.firstStage.brownCards,choiceAncients.firstStage.brownCards + choiceAncients.secondStage.brownCards),blue.slice(choiceAncients.firstStage.blueCards,choiceAncients.firstStage.blueCards + choiceAncients.secondStage.blueCards));
    let thirdStageDeck = [].concat(green.slice(choiceAncients.firstStage.greenCards + choiceAncients.secondStage.greenCards,(choiceAncients.firstStage.greenCards + choiceAncients.secondStage.greenCards + choiceAncients.thirdStage.greenCards)),brown.slice(choiceAncients.firstStage.brownCards + choiceAncients.secondStage.brownCards,choiceAncients.firstStage.brownCards + choiceAncients.secondStage.brownCards + choiceAncients.thirdStage.brownCards),blue.slice(choiceAncients.firstStage.blueCards + choiceAncients.secondStage.blueCards,choiceAncients.firstStage.blueCards + choiceAncients.secondStage.blueCards + choiceAncients.thirdStage.blueCards));
})