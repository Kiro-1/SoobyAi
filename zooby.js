
// Array of random names
const names = ['pogi', 'batman', 'taylor swift', 'many Pacquiao', 'speed', 'mike tyson', 'ferdinand marcos ', 'kalbo', 'donald trump', 'elonmusk'];

// Function to get a random name from the array
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

// Updated showCustomAlert function
function showCustomAlert(message) {
    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Get a random name for greeting
    const userName = getRandomName();

    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 1000;
    `;

    // Create modal content
    const content = document.createElement('div');
    content.style.cssText = `
        background: white; padding: 20px; border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); text-align: center;
    `;
    
    // Create message text with time display and user greeting
    content.innerHTML = `
        <h3>Hello, ${userName}!</h3>
        <p>${message}</p>
        <p style="font-weight: bold; margin: 10px 0;">Logged in at: ${timeString}</p>
        <button id="closeBtn" style="margin-top: 10px; padding: 5px 10px; border: none; border-radius: 5px; background: #007bff; color: white; cursor: pointer;">Close</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close modal on button click
    document.getElementById('closeBtn').onclick = () => document.body.removeChild(modal);
}

// Usage example
showCustomAlert('');
