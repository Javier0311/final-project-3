// --- DOM ELEMENTS & VARIABLES ---
const creditsButton = document.getElementById('open-credits');
const settingsButton = document.getElementById('open-options');
const settingsButtonSection = document.querySelector('.options-section');
const creditsSection = document.querySelector('.credits-section');
const closeCreditsButton = document.querySelector('.credits-section .close-credits');
const closeSettingsButton = document.querySelector('.options-section .close-credits');
const startGameButton = document.getElementById('start-game');
const mainMenu = document.querySelector('.main-menu');
const imgBack = document.querySelector('.img-back');
const interactOn = document.querySelectorAll('.on-interact');
const goldContainer = document.querySelector('.gold-container');
const bookContainer = document.querySelector('.book-container');
const consoleLog = document.querySelector('.console-log');
const idGold = document.getElementById('goldplay');
const cityCanvas = document.querySelector('.city-canvas');
const idCity = document.getElementById('idCity');
const idPopulation = document.getElementById('idPopulation');
const idEconomy = document.getElementById('idEconomy');
const idDescription = document.getElementById('idDescription');
const closeCanvas = document.getElementById('closeCanvas');
const idResourceBuy = document.getElementById('idResourceBuy'); 
const idPriceSell = document.getElementById('idPriceSell');
const idResourceGet = document.getElementById('idResourceGet');
const idPriceBuy = document.getElementById('idPriceBuy');
const inventoryBtn = document.querySelector('.inventory-container');
const merchantsBtn = document.querySelector('.mercader-container');
const containerResources = document.querySelector('.container-resources');
const containerMerchants = document.querySelector('.second-part');
const containerCardMerchants = document.querySelector('.container-cardmerchants');
const buyMerchants = document.querySelector(".button-buy");
const woodStock = document.getElementById('woodStock');
const ironStock = document.getElementById('ironStock');
const wheatStock = document.getElementById('wheatStock');
const stoneStock = document.getElementById('stoneStock');
const spicesStock = document.getElementById('spicesStock');
const gemStock = document.getElementById('gemStock');
const showDispatch = document.getElementById('showDispatch');
const dispatchContainerBack = document.querySelector('.dispatch-container-back');
const closeDispatchContainer = document.getElementById('closeDispatchContainer');
const travelSectionDis = document.querySelector('.travel-section-dis');
const dispatchFirst = document.querySelector('.dispatch-first');
const confirmTravelBtn = document.getElementById('confirmTravel');
const cancelTravel = document.getElementById('cancelTravel');
const originSpan = document.querySelector('.div-from span');
const targetSpan = document.querySelector('.div-to span'); 
const distanceSpan = document.querySelector('.container-details p:nth-child(1) span');
const riskSpan = document.querySelector('.container-details p:nth-child(2) span');
const timeSpan = document.querySelector('.container-details p:nth-child(3) span');
const logContainer = document.querySelector('.container-log');
const showLoadBtn = document.getElementById('showLoad');
const loadContainerBack = document.querySelector('.load-container-back');
const closeLoadContainer = document.getElementById('closeLoadContainer');

// --- 1. MENU LOGIC ---
creditsButton.addEventListener('click', () => { creditsSection.classList.add('visible', 'animate__animated', 'animate__fadeIn'); creditsSection.style.display = 'block'; });
closeCreditsButton.addEventListener('click', () => { creditsSection.classList.remove('animate__fadeIn'); creditsSection.classList.add('animate__animated', 'animate__fadeOut'); setTimeout(() => { creditsSection.classList.remove('animate__fadeOut', 'animate__animated', 'visible'); creditsSection.style.display = 'none'; }, 1000); });
settingsButton.addEventListener('click', () => { settingsButtonSection.classList.add('visible', 'animate__animated', 'animate__fadeIn'); settingsButtonSection.style.display = 'block'; });
closeSettingsButton.addEventListener('click', () => { settingsButtonSection.classList.remove('animate__fadeIn'); settingsButtonSection.classList.add('animate__animated', 'animate__fadeOut'); setTimeout(() => { settingsButtonSection.classList.remove('animate__fadeOut', 'animate__animated', 'visible'); settingsButtonSection.style.display = 'none'; }, 1000); });
startGameButton.addEventListener('click', () => { mainMenu.classList.remove('animate__fadeIn'); mainMenu.classList.add('animate__animated', 'animate__fadeOut'); imgBack.classList.add('effect'); mainMenu.style.display = 'none'; setTimeout(() => { interactOn.forEach(e => e.style.display = 'block'); }, 1000); setTimeout(() => { goldContainer.style.display = 'flex'; bookContainer.style.display = 'flex'; consoleLog.style.display = 'flex'; }, 2000); });

// --- 2. GAME UI UPDATES ---
export function updateGold(amount){
    if (idGold) {
        idGold.textContent = amount;
        if (amount >= 5000 && !window.hasWon) {
            idGold.style.color = "#ffd700"; idGold.style.textShadow = "0 0 10px yellow"; window.hasWon = true; 
        }
    }
};

// --- 3. CITIES ---
function showCardCity (citySelect) {
    idCity.textContent = citySelect.name;
    idPopulation.textContent = citySelect.population;
    idEconomy.textContent = citySelect.economyType;
    idDescription.textContent = citySelect.description;
    if (citySelect.market) {
        idResourceBuy.textContent = citySelect.market.selling.map(i => `${i.name} (${i.price}g)`).join(', ') || "Nothing";
        idPriceSell.textContent = ""; 
        idResourceGet.textContent = citySelect.market.buying.map(i => `${i.name} (${i.price}g)`).join(', ') || "Nothing";
        idPriceBuy.textContent = "";
    } else {
        idResourceBuy.textContent = "---"; idPriceSell.textContent = ""; idResourceGet.textContent = "---"; idPriceBuy.textContent = "";
    }
    cityCanvas.style.display = 'block';
}
closeCanvas.addEventListener('click', () => { cityCanvas.style.display = 'none'; });
export function citiesInformation (listCities) {
    ["oakhaven", "whispering", "serpent", "aethelgard", "ember"].forEach(id => {
        const el = document.getElementById(`${id}-city`);
        if (el) el.addEventListener('click', () => {
            const city = listCities.find(c => c.id === id);
            if (city) showCardCity(city);
        });
    });
}

// --- 4. LEDGER ---
inventoryBtn.addEventListener('click', () => { containerResources.style.display = 'flex'; inventoryBtn.classList.add('activeBtn'); containerMerchants.style.display = 'none'; merchantsBtn.classList.remove('activeBtn'); });
merchantsBtn.addEventListener('click', () => { containerMerchants.style.display = 'flex'; merchantsBtn.classList.add('activeBtn'); containerResources.style.display = 'none'; inventoryBtn.classList.remove('activeBtn'); });

export function inventoryData(stock){
    if(stock) {
        if(woodStock) woodStock.textContent = stock.wood;
        if(ironStock) ironStock.textContent = stock.iron;
        if(wheatStock) wheatStock.textContent = stock.wheat;
        if(stoneStock) stoneStock.textContent = stock.stone;
        if(spicesStock) spicesStock.textContent = stock.spices;
        if(gemStock) gemStock.textContent = stock.gems;
    }
}

export function configurarBotonContratar(mainConnect) {
    if (buyMerchants) {
        const newBtn = buyMerchants.cloneNode(true);
        buyMerchants.parentNode.replaceChild(newBtn, buyMerchants);
        newBtn.addEventListener('click', () => mainConnect());
    }
}

function generarHTMLCarga(inventory) {
    if (!inventory) return '<div style="font-size:0.7rem; color:#888;">(Empty)</div>';
    const iconMap = { wood: 'wood.png', iron: 'pig-iron.png', wheat: 'wheat.png', stone: 'granite.png', spices: 'spices.png', gems: 'gem.png' };
    const items = Object.entries(inventory).filter(([k, q]) => q > 0);
    if (items.length === 0) return '<div style="font-size:0.7rem; color:#999; margin-top:5px;">📦 Empty cart</div>';
    let html = '<div class="cargo-container">';
    items.forEach(([k, q]) => { html += `<div class="cargo-item"><img src="./images/${iconMap[k] || 'wood.png'}"> ${q}</div>`; });
    return html + '</div>';
}

export function seeMerchantHire(checkHire) {
    if (containerCardMerchants) {
        containerCardMerchants.innerHTML = '';
        const hired = checkHire.filter(m => m.hire === true);
        hired.forEach(m => {
            const card = document.createElement('div'); card.className = 'merchant-card';
            let statusHTML = '';
            if (m.status === 'traveling' && m.arrivalTime) {
                const now = Date.now();
                const timeLeft = Math.max(0, Math.ceil((m.arrivalTime - now) / 1000));
                statusHTML = `<div class="travel-status-container"><div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#ccc;"><span>Heading to: <strong>${m.destination}</strong></span></div><div class="progress-bar-bg"><div class="progress-bar-fill"></div></div><div class="time-left-text" style="text-align:right; font-size:0.7rem;">⏳ ${timeLeft > 0 ? timeLeft + 's' : 'Arriving...'}</div></div>`;
            } else {
                statusHTML = `<span style="color:#8fbc8f; font-size:0.8rem;">📍 In ${m.currentLocation}</span>`;
            }
            card.innerHTML = `<div class="card-header"><div style="display:flex; justify-content:space-between; align-items:center;"><strong>${m.name}</strong>${m.status !== 'traveling' ? statusHTML : ''}</div>${m.status === 'traveling' ? statusHTML : ''}${generarHTMLCarga(m.inventory)}</div>`;
            containerCardMerchants.appendChild(card);
        });
        if (hired.length === 0) containerCardMerchants.innerHTML = '<p class="empty-msg">You have no active merchants.</p>';
    }
};

// --- 5. DISPATCH ---
showDispatch.addEventListener('click', () => { dispatchContainerBack.style.display = 'block'; dispatchFirst.style.display = 'flex'; });
closeDispatchContainer.addEventListener('click', () => { dispatchContainerBack.style.display = 'none'; travelSectionDis.style.display = 'none'; });
cancelTravel.addEventListener('click', () => { travelSectionDis.style.display = 'none'; dispatchFirst.style.display = 'flex'; });

let selectedMerchantName = null;
let selectedTargetCity = null;
let allCitiesData = []; 
let currentRoutesList = []; 
let currentRouteIndex = 0; 

export function storeCitiesData(cities) { allCitiesData = cities; }

export function setupTravelButtons(playerData, dispatchCallback) {
    const dispatchContainer = document.getElementById('dispatch-list-container');
    if (!dispatchContainer) return;
    dispatchContainer.innerHTML = '';

    playerData.merchants.forEach(m => {
        let img = "mercader1.webp";
        if (m.name.includes("Lyra")) img = "mercader2.webp";
        if (m.name.includes("Tony")) img = "mercader3.webp";
        const isHired = m.hire; const isFree = m.free;
        let btnClass = "loadMerchader", btnText = "TRAVEL", isActionable = false;

        if (!isHired) { btnClass += " btn-locked"; btnText = "LOCKED"; }
        else if (!isFree) { btnClass += " btn-traveling"; btnText = "ON ROUTE"; }
        else { btnClass += " dispatch-action-btn"; isActionable = true; }

        const box = document.createElement('div'); box.className = 'box-merchant';
        box.innerHTML = `<div class="container-each-merchant" style="flex-direction:column; align-items:flex-start; gap:5px; height:auto; min-height:100px;"><div style="display:flex; align-items:center; gap:15px; width:100%;"><img src="./images/${img}" style="width:60px; height:60px; border-radius:50%; object-fit:cover; border:2px solid #473021;"><div style="flex:1;"><p style="font-weight:bold; font-size:1rem; margin:0;">${m.name}</p><p style="font-size:0.8rem; margin:0;">Ubicación: <strong>${m.currentLocation}</strong></p></div></div>${isHired ? generarHTMLCarga(m.inventory) : ''}</div><div class="${btnClass}">${btnText}</div>`;
        dispatchContainer.appendChild(box);

        if (isActionable) {
            box.querySelector('.dispatch-action-btn').addEventListener('click', () => openTravelPanel(m));
        }
    });

    const currBtn = document.getElementById('confirmTravel');
    if(currBtn) {
        const newBtn = currBtn.cloneNode(true);
        currBtn.parentNode.replaceChild(newBtn, currBtn);
        newBtn.addEventListener('click', () => {
            if (selectedMerchantName && selectedTargetCity) {
                dispatchCallback(selectedMerchantName, selectedTargetCity);
                travelSectionDis.style.display = 'none'; dispatchFirst.style.display = 'flex';
            }
        });
    }
}

function openTravelPanel(merchant) {
    selectedMerchantName = merchant.name;
    const currentCity = allCitiesData.find(c => c.id === merchant.currentLocation);
    if (!currentCity) return;
    currentRoutesList = currentCity.connections; currentRouteIndex = 0; 
    if (currentRoutesList.length === 0) { alert("No routes"); return; }
    
    originSpan.textContent = currentCity.name;
    const divTo = document.querySelector('.div-to');
    
    if (currentRoutesList.length > 1) {
        divTo.innerHTML = `<p>TO</p><div style="display:flex; align-items:center; gap:10px; justify-content:center;"><button id="prevRouteBtn" style="cursor:pointer; background:#4e3226; color:white; border:none; border-radius:50%; width:25px; height:25px;"> < </button><span id="targetCityName" style="font-weight:bold;">...</span><button id="nextRouteBtn" style="cursor:pointer; background:#4e3226; color:white; border:none; border-radius:50%; width:25px; height:25px;"> > </button></div>`;
        document.getElementById('prevRouteBtn').addEventListener('click', () => { currentRouteIndex--; if(currentRouteIndex < 0) currentRouteIndex = currentRoutesList.length -1; updateRouteDisplay(); });
        document.getElementById('nextRouteBtn').addEventListener('click', () => { currentRouteIndex++; if(currentRouteIndex >= currentRoutesList.length) currentRouteIndex = 0; updateRouteDisplay(); });
    } else {
        divTo.innerHTML = `<p>TO</p><span style="font-weight:bold;">...</span>`;
    }
    
    updateRouteDisplay();
    travelSectionDis.style.display = 'flex'; dispatchFirst.style.display = 'none';
}

function updateRouteDisplay() {
    const route = currentRoutesList[currentRouteIndex];
    const target = allCitiesData.find(c => c.id === route.targetId);
    selectedTargetCity = target.id;
    
    // Si tenemos las flechas, usamos targetCityName, si no el span por defecto en divTo
    const span = document.getElementById('targetCityName') || document.querySelector('.div-to span:last-child');
    if(span) span.textContent = target.name;
    
    distanceSpan.textContent = route.distance;
    riskSpan.textContent = (route.risk * 100) + "%";
    timeSpan.textContent = route.distance + " sec";
}

// --- 6. LOGS ---
export function addLogMessage(message) {
    if (!logContainer) return;
    const p = document.createElement('p'); p.textContent = `> ${message}`; p.style.fontSize = "0.9rem"; p.style.margin = "2px 5px";
    logContainer.prepend(p);
    if (logContainer.children.length > 5) logContainer.removeChild(logContainer.lastChild);
}

// --- 7. TRADE SYSTEM (CORREGIDO Y REACTIVO) ---

let uiStoredPlayer = null; 
let refreshTradeUI = null; // Variable para guardar la función de redibujado

export function updateLocalPlayer(player) {
    uiStoredPlayer = player;
    // ¡AQUÍ ESTÁ LA MAGIA! Si la ventana está abierta, la redibujamos
    if (refreshTradeUI && document.querySelector('.load-container-back').style.display === 'block') {
        refreshTradeUI(); 
    }
}

export function setupLoadWagon(allCities, tradeCallback) {
    const newShowLoadBtn = showLoadBtn.cloneNode(true);
    showLoadBtn.parentNode.replaceChild(newShowLoadBtn, showLoadBtn);
    let currentMerchantIndex = 0;

    newShowLoadBtn.addEventListener('click', () => {
        loadContainerBack.style.display = 'block';
        
        // Función interna para dibujar el modal
        const render = () => {
            const currentPlayer = uiStoredPlayer || { merchants: [] };
            const available = currentPlayer.merchants.filter(m => m.hire && m.free);
            const container = document.querySelector('.load-container');
            
            // Reconstruimos estructura básica si se borró
            if (!document.getElementById('market-content')) {
                container.innerHTML = `<div class="close-load-container" id="closeLoadContainer" style="cursor:pointer; position:absolute; right:15px; top:15px; font-size:1.5rem; color:#e3cc9f;">X</div><div class="h2-merchant" style="text-align:center; margin-bottom:20px;"><h2>Local Market</h2></div><div id="market-content" style="display:flex; flex-direction:column; gap:15px; color:white; overflow-y:auto; height:400px; padding-right:10px;"></div>`;
                document.getElementById('closeLoadContainer').addEventListener('click', () => { loadContainerBack.style.display = 'none'; refreshTradeUI = null; });
            }
            const marketDiv = document.getElementById('market-content');
            marketDiv.innerHTML = '';

            if (available.length === 0) { marketDiv.innerHTML = '<div style="text-align:center;">No merchants available here.</div>'; return; }
            
            if (currentMerchantIndex >= available.length) currentMerchantIndex = 0;
            if (currentMerchantIndex < 0) currentMerchantIndex = available.length - 1;
            
            const m = available[currentMerchantIndex];
            const inv = m.inventory || { wood: 0, iron: 0, wheat: 0, stone: 0, gems: 0, spices: 0 };
            const city = allCities.find(c => c.id === m.currentLocation);

            if (!city || !city.market) { marketDiv.innerHTML = '<p>No market.</p>'; return; }

            // Navegación
            let navHTML = `<strong>${m.name}</strong>`;
            if (available.length > 1) navHTML = `<div style="display:flex; justify-content:center; gap:10px;"><button id="prevM" style="cursor:pointer;"> < </button><strong>${m.name}</strong><button id="nextM" style="cursor:pointer;"> > </button></div>`;

            // Botones Compra
            const sellHTML = city.market.selling.map(i => `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px; border-bottom:1px solid #5a4030; padding-bottom:5px;">
                    <div>${i.name} <span style="color:#f39c12;">${i.price}g</span></div>
                    <div>
                        <button class="buy-btn" data-id="${i.id}" data-qty="1" style="cursor:pointer; background:#8b4513; color:white; border:none; border-radius:3px;">+1</button>
                        <button class="buy-btn" data-id="${i.id}" data-qty="10" style="cursor:pointer; background:#8b4513; color:white; border:none; border-radius:3px;">+10</button>
                    </div>
                </div>`).join('');

            // Botones Venta (¡Desactivados si no tienes stock!)
            const buyHTML = city.market.buying.map(i => {
                const stock = inv[i.id] || 0;
                const canSell = stock > 0;
                return `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px; border-bottom:1px solid #5a4030; padding-bottom:5px;">
                    <div>${i.name} <span style="color:#2ecc71;">${i.price}g</span> <span style="font-size:0.7rem;">(You have: ${stock})</span></div>
                    <div>
                        <button class="sell-btn" data-id="${i.id}" data-qty="1" style="cursor:pointer; background:${canSell?'#2e5902':'#555'}; color:white; border:none; border-radius:3px;" ${!canSell?'disabled':''}>-1</button>
                        <button class="sell-btn" data-id="${i.id}" data-qty="10" style="cursor:pointer; background:${canSell?'#27ae60':'#555'}; color:white; border:none; border-radius:3px;" ${!canSell?'disabled':''}>-10</button>
                    </div>
                </div>`;
            }).join('');

            marketDiv.innerHTML = `
                <h3 style="text-align:center; color:#e3cc9f;">📍 ${city.name}</h3>
                <div style="text-align:center; margin-bottom:10px;">${navHTML}</div>
                <div style="text-align:center; font-size:0.8rem; color:#ccc;">Load: ${Object.values(inv).reduce((a,b)=>a+b,0)} / ${m.capacity}</div>
                <div style="background:#473021; padding:10px; border-radius:10px; margin-top:10px;"><h4>Buy</h4>${sellHTML}</div>
                <div style="background:#473021; padding:10px; border-radius:10px; margin-top:10px;"><h4>Sell</h4>${buyHTML}</div>
            `;

            // Eventos dinámicos
            if(document.getElementById('prevM')) {
                document.getElementById('prevM').onclick = () => { currentMerchantIndex--; render(); };
                document.getElementById('nextM').onclick = () => { currentMerchantIndex++; render(); };
            }
            document.querySelectorAll('.buy-btn').forEach(b => b.onclick = (e) => tradeCallback({ action:'buy', goodId:e.target.dataset.id, quantity:parseInt(e.target.dataset.qty), merchantName:m.name }));
            document.querySelectorAll('.sell-btn').forEach(b => b.onclick = (e) => tradeCallback({ action:'sell', goodId:e.target.dataset.id, quantity:parseInt(e.target.dataset.qty), merchantName:m.name }));
        };

        // Guardamos la función para que updateLocalPlayer la pueda llamar
        refreshTradeUI = render;
        
        render(); // Dibujar primera vez
    });
}


// --- 8. GAME OVER LOGIC ---
export function checkGameOverCondition(player) {
    // 1. Calcular inventario total (sumando todos los bienes)
    // Si player.inventory es null, asumimos 0
    const inv = player.inventory || {};
    const totalGoods = Object.values(inv).reduce((a, b) => a + b, 0);
    
    // 2. Contar mercaderes contratados
    const hiredMerchants = player.merchants.filter(m => m.hire).length;

    // CONDICIÓN A: Sin mercaderes y sin dinero para contratar (500g)
    if (hiredMerchants === 0 && player.gold < 500) {
        triggerGameOver("You ran out of merchants and gold to hire more.", player.gold, hiredMerchants);
        return true; 
    }

    // CONDICIÓN B: Bancarrota técnica (con mercaderes pero sin capacidad de comercio)
    // Tienes mercaderes, pero 0 bienes para vender y muy poco oro (< 20g) para comprar.
    if (hiredMerchants > 0 && totalGoods === 0 && player.gold < 20) {
        triggerGameOver("No goods and no gold to invest. The market has devoured you.", player.gold, hiredMerchants);
        return true;
    }

    return false;
}

function triggerGameOver(reason, gold, merchants) {
    // Evitar que el loop siga corriendo lógica
    window.hasLost = true; 

    const modal = document.getElementById('game-over-modal');
    
    if (modal) {
        // Llenar datos del modal
        const reasonEl = document.getElementById('game-over-reason');
        if(reasonEl) reasonEl.textContent = reason;
        
        const goldEl = document.getElementById('go-gold');
        if(goldEl) goldEl.textContent = gold;

        const merchEl = document.getElementById('go-merchants');
        if(merchEl) merchEl.textContent = merchants;
        
        // Mostrar el modal
        modal.style.display = 'flex'; 

        // Lógica del Botón RESTART (Reiniciar Servidor + Cliente)
        const btn = document.getElementById('restart-btn');
        if (btn) {
            // Clonamos el botón para eliminar eventos anteriores y no acumular clics
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', async () => {
                newBtn.textContent = "Restarting..."; 
                newBtn.disabled = true;

                try {
                    // 1. Pedir al servidor que resetee el archivo player.json
                    await fetch('http://localhost:3000/api/reset', {
                        method: 'POST'
                    });

                    // 2. Borrar la caché local del navegador
                    localStorage.removeItem('merchant_voyage_save_v1');

                    // 3. Recargar la página limpia
                    window.location.reload();

                } catch (error) {
                    console.error("Error al reiniciar:", error);
                    alert("Error conectando con el servidor. Asegúrate de que el backend está corriendo.");
                    newBtn.disabled = false;
                    newBtn.textContent = "Try Again";
                }
            });
        }
    }
}