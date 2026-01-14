import { 
    updateGold, 
    citiesInformation, 
    inventoryData, 
    seeMerchantHire,
    configurarBotonContratar,
    storeCitiesData,
    setupTravelButtons,
    addLogMessage,
    setupLoadWagon,
    checkGameOverCondition,
    updateLocalPlayer // <--- IMPORTANTE
} from './ui.js';

const API_URL = 'http://localhost:3000/api';

// --- VARIABLES GLOBALES ---
let previousMerchantsState = [];
let globalCities = [];

// --- FUNCIONES API ---

// --- WEB STORAGE LOGIC ---
const SAVE_KEY = 'merchant_voyage_save_v1';

function saveLocalProgress(playerData) {
    if (playerData) {
        localStorage.setItem(SAVE_KEY, JSON.stringify(playerData));
    }
}

function loadLocalProgress() {
    const rawData = localStorage.getItem(SAVE_KEY);
    if (rawData) {
        return JSON.parse(rawData);
    }
    return null;
}

async function tradeGoods(tradeData) {
    try {
        const response = await fetch(`${API_URL}/trade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tradeData)
        });
        const data = await response.json();

        if (data.success) {
            // LOG: Mensaje de compra/venta exitosa
            addLogMessage(`💰 ${data.message}`); 
            
            updateGold(data.player.gold);
            inventoryData(data.player.inventory);
            updateLocalPlayer(data.player);

            saveLocalProgress(data.player);

        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Trade error", error);
    }
}

async function dispatchMerchant(merchantName, targetCityId) {
    try {
        const response = await fetch(`${API_URL}/dispatch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ merchantName, targetCityId })
        });
        const data = await response.json();

        if (data.success) {
            // LOG: Mensaje de viaje iniciado
            addLogMessage(`🚚 ${data.message}`);
            
            seeMerchantHire(data.player.merchants);
            setupTravelButtons(data.player, dispatchMerchant);
            updateLocalPlayer(data.player);

            saveLocalProgress(data.player);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error dispatching:", error);
    }
}

async function contratarSiguiente() {
    try {
        const response = await fetch(`${API_URL}/hire`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message); 
            // LOG: Mensaje de contratación
            addLogMessage(`🤝 New contract: ${data.message}`);

            updateGold(data.player.gold);
            seeMerchantHire(data.player.merchants); 
            setupTravelButtons(data.player, dispatchMerchant);
            updateLocalPlayer(data.player);

            saveLocalProgress(data.player);
        } else {
            alert(data.error); 
        }

    } catch (error) {
        console.error("Error hiring:", error);
    }
}

// --- GAME LOOP ---

let lastNewsId = 0;

async function gameLoop() {
    try {
        const response = await fetch(`${API_URL}/player`);
        const data = await response.json(); 
        
        const player = data; 
        const events = data.events || [];
        const currentNews = data.globalNews; // <--- NUEVO

        // 1. GUI
        updateGold(player.gold);
        seeMerchantHire(player.merchants);
        inventoryData(player.inventory);
        setupTravelButtons(player, dispatchMerchant);
        updateLocalPlayer(player);

        saveLocalProgress(player);

        // 2. EVENTOS PERSONALES
        if (events.length > 0) {
            events.forEach(msg => addLogMessage(msg));
        }

        // 3. NOTICIAS GLOBALES (Solo si es nueva)
        if (currentNews && currentNews.id !== lastNewsId) {
            addLogMessage(currentNews.text); // Muestra: "📰 NOTICIA: Sequía en Oakhaven..."
            
            // Opcional: Alerta visual más fuerte
            // alert(currentNews.text); 
            
            lastNewsId = currentNews.id; // Actualizamos para no repetirla
        }

        previousMerchantsState = player.merchants; 

        if (checkGameOverCondition(data)) {
            return; // Si perdió, salimos del bucle para que no siga actualizando
        }

    } catch (error) {
        // console.error("Error loop");
    }
}

// --- INICIALIZACIÓN ---
async function initGame() {
    console.log("Connecting...");
    configurarBotonContratar(contratarSiguiente);

    // 1. CARGA INMEDIATA DESDE LOCALSTORAGE (Requisito Web Storage)
    const localData = loadLocalProgress();
    if (localData) {
        console.log("📂 Cargando respaldo local...");
        updateGold(localData.gold);
        seeMerchantHire(localData.merchants);
        inventoryData(localData.inventory);
        updateLocalPlayer(localData);
        // Nota: No configuramos los botones de viaje aquí para evitar conflictos 
        // hasta que el servidor confirme la posición real.
    }

    // 2. CARGA DE CIUDADES (Servidor)
    try {
        const response = await fetch(`${API_URL}/cities`);
        globalCities = await response.json(); 
        citiesInformation(globalCities);
        storeCitiesData(globalCities);
        
        // Configurar mercado solo cuando tenemos ciudades
        if (globalCities.length > 0) {
            setupLoadWagon(globalCities, tradeGoods); 
        }
    } catch (error) {
        console.error("❌ Error Cities:", error);
    }

    // 3. SINCRONIZACIÓN CON EL SERVIDOR (La verdad absoluta)
    try {
        const response = await fetch(`${API_URL}/player`);
        const player = await response.json();

        // Actualizamos UI con la verdad del servidor
        seeMerchantHire(player.merchants);
        inventoryData(player.inventory);
        updateGold(player.gold);
        setupTravelButtons(player, dispatchMerchant);
        updateLocalPlayer(player);

        // ¡GUARDAMOS EN LOCALSTORAGE!
        saveLocalProgress(player);

    } catch (error) {
        console.error("❌ Error Player:", error);
    }

    setInterval(gameLoop, 1000); 
}

document.addEventListener('DOMContentLoaded', initGame);