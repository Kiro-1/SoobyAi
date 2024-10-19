// Array of random names
const names = ['Pogi', 'Batman', 'Taylor Swift', 'Manny Pacquiao', 'Speed', 'Mike Tyson', 'Ferdinand Marcos', 'Kalbo', 'Donald Trump', 'Elon Musk'];

// Function to get a random name from the array
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

// Updated showCustomAlert function with dark mode and aligned buttons
function showCustomAlert(message, options = {}) {
    // Set default options if not provided
    const { autoCloseTime = null, onClose = null, playSound = false } = options;

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
        position: relative;
        min-width: 300px;
        max-width: 400px;
        resize: both; 
        overflow: auto;
    `;

    // Create message text with time display and user greeting
    content.innerHTML = `
        <h3>Hello, ${userName}!</h3>
        <p>${message}</p>
        <p style="font-weight: bold; margin: 10px 0;">Logged in at: ${timeString}</p>
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
            <button id="closeBtn" style="padding: 5px 10px; border: none; border-radius: 5px; background: #007bff; color: white; cursor: pointer;">Close</button>
            <button id="toggleDarkMode" style="padding: 5px 10px; border: none; border-radius: 5px; background: #28a745; color: white; cursor: pointer;">Dark Mode</button>
        </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Optional: Play a sound when the modal appears
    if (playSound) {
        const audio = new Audio('https://example.com/alert-sound.mp3');  // Replace with a real sound URL
        audio.play();
    }

    // Close modal on button click
    document.getElementById('closeBtn').onclick = () => closeModal();

    // Toggle Dark Mode
    let isDarkMode = false;
    document.getElementById('toggleDarkMode').onclick = () => {
        isDarkMode = !isDarkMode;
        content.style.backgroundColor = isDarkMode ? '#333' : 'white';
        content.style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('toggleDarkMode').innerText = isDarkMode ? 'Light Mode' : 'Dark Mode';
    };

    // Close modal when the Escape key is pressed
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Close modal function
    function closeModal() {
        document.body.removeChild(modal);
        if (onClose) onClose();  // Call the callback function if provided
    }

    // Optional: Auto close modal after a certain time (if autoCloseTime is provided)
    if (autoCloseTime) {
        setTimeout(() => {
            closeModal();
        }, autoCloseTime);
    }
}

// Usage example
showCustomAlert('Welcome to SOOBY AI!', { 
    autoCloseTime: 10000,  // Auto close after 10 seconds (optional)
    onClose: () => console.log('Modal closed!'),  // Callback when modal is closed
    playSound: true  // Play a sound when the modal appears
});