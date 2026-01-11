import { updateGold } from './ui.js';

const API_URL = 'http://localhost:3000/api';

async function initGame() {
    console.log("Connecting to the Merchant Guild...");

    try{
        const response = await fetch(`${API_URL}/cities`);
        
        const cities = await response.json();

        console.log("Data received:", cities);
        

        // alert(`Success! The server sent us ${cities.length} cities.`);

    } catch (error) {
        console.error("❌ Critical Error:", error);
        alert("Server not responding. Did you run 'npm start' on the backend?");
    }

    try {
        const response = await fetch(`${API_URL}/player`);

        const player = await response.json();

        console.log("Data recieved:", player);

        updateGold(player.gold)

    } catch (error) {
        console.error("❌ Critical Error:", error);
        alert("Server not responding. Did you run 'npm start' on the backend?");
    }
}

document.addEventListener('DOMContentLoaded', initGame);
    