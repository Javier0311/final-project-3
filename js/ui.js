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

// Cities Information

const whispering = document.getElementById("whispering-city");
const aethelgard = document.getElementById("aethelgard-city");
const oakhaven = document.getElementById("oakhaven-city");
const serpent = document.getElementById("serpent-city");
const ember = document.getElementById("ember-city");

const cityCanvas = document.querySelector('.city-canvas');

const idCity = document.getElementById('idCity');
const idPopulation = document.getElementById('idPopulation');
const idEconomy = document.getElementById('idEconomy');
const idDescription = document.getElementById('idDescription');

const closeCanvas = document.getElementById('closeCanvas');

function showCardCity (citySelect) {
    idCity.textContent = citySelect.name;
    idPopulation.textContent = citySelect.population;
    idEconomy.textContent = citySelect.economyType;
    idDescription.textContent = citySelect.description;

    cityCanvas.style.display = 'block';
}

closeCanvas.addEventListener('click', () => {
    cityCanvas.style.display = 'none';
});

export function citiesInformation (listCities) {
    
    // Oakhaven
    oakhaven.addEventListener('click', () => {
        
        const cityFound = listCities.find(c => c.id === 'oakhaven');

        if (cityFound){
            console.log('City Found:', cityFound);
            showCardCity(cityFound);
        }
    });

    // The Whispering Woods

    whispering.addEventListener('click', () => {
        
        const cityFound = listCities.find(c => c.id === 'whispering');

        if (cityFound){
            console.log('City Found:', cityFound);
            showCardCity(cityFound);
        }
    });

    // The Serpent Isles

    serpent.addEventListener('click', () => {
        
        const cityFound = listCities.find(c => c.id === 'serpent');

        if (cityFound){
            console.log('City Found:', cityFound);
            showCardCity(cityFound);
        }
    });

    // Aethelgard

    aethelgard.addEventListener('click', () => {
        
        const cityFound = listCities.find(c => c.id === 'aethelgard');

        if (cityFound){
            console.log('City Found:', cityFound);
            showCardCity(cityFound);
        }
    });

    // Ember Cay

    ember.addEventListener('click', () => {
        
        const cityFound = listCities.find(c => c.id === 'ember');

        if (cityFound){
            console.log('City Found:', cityFound);
            showCardCity(cityFound);
        }
    });

}

// Ledger Section

const inventoryBtn = document.querySelector('.inventory-container');
const merchantsBtn = document.querySelector('.mercader-container');

const containerResources = document.querySelector('.container-resources');
const containerMerchants = document.querySelector('.second-part');
const activeBtn = document.querySelector('.activeBtn');

inventoryBtn.addEventListener('click', () => {
    containerResources.style.display = 'flex';
    inventoryBtn.classList.add('activeBtn');

    containerMerchants.style.display = 'none';
    merchantsBtn.classList.remove('activeBtn');
});

merchantsBtn.addEventListener('click', () => {
    containerMerchants.style.display = 'flex';
    merchantsBtn.classList.add('activeBtn');

    containerResources.style.display = 'none';
    inventoryBtn.classList.remove('activeBtn');
});

// Get Information about Inventory

const woodStock = document.getElementById('woodStock');
const ironStock = document.getElementById('ironStock');
const wheatStock = document.getElementById('wheatStock');
const stoneStock = document.getElementById('stoneStock');
const spicesStock = document.getElementById('spicesStock');
const gemStock = document.getElementById('gemStock');

export function inventoryData(stock){
    inventoryBtn.addEventListener('click', () => {
        woodStock.textContent = stock.wood;
        ironStock.textContent = stock.iron;
        wheatStock.textContent = stock.wheat;
        stoneStock.textContent = stock.stone;
        spicesStock.textContent = stock.spices;
        gemStock.textContent = stock.gems;

    });
}

// Merchants

const buyMerchants = document.querySelector(".button-buy");
const containerCardMerchants = document.querySelector('.container-cardmerchants');

export function configurarBotonContratar(mainConnect) {
    if (buyMerchants) {
       
        const newBtn = buyMerchants.cloneNode(true);
        buyMerchants.parentNode.replaceChild(newBtn, buyMerchants);
        
        // Cuando hagan click, ejecutamos la función que nos mandó main.js
        newBtn.addEventListener('click', () => {
            console.log("Click en contratar detectado en UI...");
            mainConnect(); 
        });
    }
}

export function seeMerchantHire(checkHire) {

    if (containerCardMerchants) {
        containerCardMerchants.innerHTML = '';

        const hiredMerchants = checkHire.filter(m => m.hire === true);

        hiredMerchants.forEach(merchant => {

            const card = document.createElement('div');
            card.className = 'merchant-card';

            card.innerHTML = `
                <div class="card-header">
                    <strong>${merchant.name}</strong>
            `;

            containerCardMerchants.appendChild(card);
        });

        if (hiredMerchants.length === 0) {
            containerCardMerchants.innerHTML = '<p class="empty-msg">No tienes mercaderes activos.</p>';
        }
    
    }
   
};