// Main Menu //

const creditsButton = document.getElementById('open-credits');
const settingsButton = document.getElementById('open-options');
const settingsButtonSection = document.querySelector('.options-section');
const creditsSection = document.querySelector('.credits-section');
const closeCreditsButton = document.querySelector('.credits-section .close-credits');
const closeSettingsButton = document.querySelector('.options-section .close-credits');


// Credits & Lore Section //

creditsButton.addEventListener('click', () => {
    creditsSection.classList.add('visible', 'animate__animated', 'animate__fadeIn');
    creditsSection.style.display = 'block';
})

closeCreditsButton.addEventListener('click', () => {
    creditsSection.classList.remove('animate__fadeIn');
    creditsSection.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        creditsSection.classList.remove('animate__fadeOut', 'animate__animated', 'visible');
        creditsSection.style.display = 'none';
    }, 1000); // Assuming 1s animation duration
})

settingsButton.addEventListener('click', () => {
    settingsButtonSection.classList.add('visible', 'animate__animated', 'animate__fadeIn');
    settingsButtonSection.style.display = 'block';
})

closeSettingsButton.addEventListener('click', () => {
    settingsButtonSection.classList.remove('animate__fadeIn');
    settingsButtonSection.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        settingsButtonSection.classList.remove('animate__fadeOut', 'animate__animated', 'visible');
        settingsButtonSection.style.display = 'none';
    }, 1000); // Assuming 1s animation duration
})

// Start Game Button //

const startGameButton = document.getElementById('start-game');
const mainMenu = document.querySelector('.main-menu');
const imgBack = document.querySelector('.img-back');

const interactOn = document.querySelectorAll('.on-interact');
const goldContainer = document.querySelector('.gold-container');
const bookContainer = document.querySelector('.book-container');
const consoleLog = document.querySelector('.console-log')

startGameButton.addEventListener('click', () => {
    mainMenu.classList.remove('animate__fadeIn');
    mainMenu.classList.add('animate__animated', 'animate__fadeOut');
    imgBack.classList.add('effect');
    mainMenu.style.display = 'none';

    setTimeout(() => {
        interactOn.forEach(element => {
            element.style.display = 'block';
        });
    }, 1000); // Assuming 1s animation duration

    setTimeout(() => {
        goldContainer.style.display = 'flex';
        bookContainer.style.display = 'flex';
        consoleLog.style.display = 'flex'

    }, 2000);
});

// Getting data from Server

const idGold = document.getElementById('goldplay');

export function updateGold(amount){
    if (idGold) {
        idGold.textContent = amount;

    } else {
        console.error("UI Error: Element .goldplay not found!");
    }
};
