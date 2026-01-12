import { updateGold, 
    citiesInformation, 
    inventoryData, 
    seeMerchantHire,
    configurarBotonContratar
} from './ui.js';

const API_URL = 'http://localhost:3000/api';

async function contratarSiguiente() {
    console.log("Enviando orden de compra al servidor...");
    
    try {
        const response = await fetch(`${API_URL}/hire`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message); // "¡Contratado a Garrick!"
            
            // 3. ACTUALIZAMOS LA PANTALLA CON LOS DATOS NUEVOS
            // El servidor nos devolvió el "player" actualizado, ¡usémoslo!
            updateGold(data.player.gold);
            seeMerchantHire(data.player.merchants); // Repintamos la lista
            
        } else {
            alert(data.error); // "No tienes dinero"
        }

    } catch (error) {
        console.error("Error en el trato:", error);
    }
}

async function initGame() {
    console.log("Connecting to the Merchant Guild...");

    configurarBotonContratar(contratarSiguiente);

    try{
        const response = await fetch(`${API_URL}/cities`);
        
        const cities = await response.json();

        console.log("Data received:", cities);
        
        citiesInformation(cities);

        // alert(`Success! The server sent us ${cities.length} cities.`);

    } catch (error) {
        console.error("❌ Critical Error:", error);
        alert("Server not responding. Did you run 'npm start' on the backend?");
    }

    try {
        const response = await fetch(`${API_URL}/player`);

        const player = await response.json();

        console.log("Data recieved:", player);

        seeMerchantHire(player.merchants)
        inventoryData(player.inventory);
        updateGold(player.gold);

    } catch (error) {
        console.error("❌ Critical Error:", error);
        alert("Server not responding. Did you run 'npm start' on the backend?");
    }

    
}

document.addEventListener('DOMContentLoaded', initGame);
    