// Admin credentials
const adminUsername = 'kiro-1'; // Change this to your desired username
const adminPassword = 'Kirosite5'; // Change this to your desired password

let isAuthenticated = false; // Variable to track if a user is authenticated

// Function to authenticate the admin
function authenticateAdmin(inputUsername, inputPassword) {
    return inputUsername === adminUsername && inputPassword === adminPassword;
}

// Function to authenticate a user
function authenticateUser(inputUsername, inputPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === inputUsername && user.password === inputPassword);
}

// Function to handle user registration
function registerUser() {
    const username = prompt("Enter your username:");
    const password = prompt("Enter your password:");

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.find(user => user.username === username)) {
        alert("Username already exists. Please choose a different one.");
        return false; // Registration failed
    }

    // Store new user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    return true; // Registration succeeded
}

// Function to handle user login
function userLogin() {
    while (true) { // Keep asking until successful
        const username = prompt("Enter your username:");
        const password = prompt("Enter your password:");

        if (authenticateUser(username, password)) {
            alert("Login successful! Welcome back!");
            isAuthenticated = true; // Set authentication to true
            console.log(`User ${username} logged in.`);
            displayNotifications(); // Show notifications after logging in
            break; // Exit the loop on successful login
        } else {
            alert("Login failed! Incorrect username or password. Please try again.");
        }
    }
}

// Function to handle admin login
function adminLogin() {
    while (true) { // Keep asking until successful
        const username = prompt("Enter your admin username:");
        const password = prompt("Enter your admin password:");

        if (authenticateAdmin(username, password)) {
            alert("Access granted! Welcome, Admin!");
            isAuthenticated = true; // Set authentication to true
            adminOptions();
            break; // Exit the loop on successful login
        } else {
            alert("Access denied! Incorrect username or password. Please try again.");
        }
    }
}

// Function to display all registered users
function displayAllUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        console.log("No registered users.");
        alert("No registered users.");
    } else {
        console.log("Registered users:", users);
        alert(`Registered users:\n${users.map(user => `Username: ${user.username}, Password: ${user.password}`).join('\n')}`);
    }
}

// Function to remove a user
function removeUser() {
    const username = prompt("Enter the username of the account to remove:");
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        users.splice(userIndex, 1); // Remove the user from the array
        localStorage.setItem('users', JSON.stringify(users));
        alert(`User ${username} has been removed.`);
        console.log(`User ${username} has been removed.`);
    } else {
        alert(`User ${username} does not exist.`);
    }
}

// Function to notify all users
function notifyAllUsers() {
    const message = prompt("Enter the message to notify all users:");
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    notifications.push(message); // Store the notification
    localStorage.setItem('notifications', JSON.stringify(notifications));
    alert("Notification sent to all users.");
}

// Function to display notifications for users
function displayNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    if (notifications.length > 0) {
        alert("Notifications:\n" + notifications.join('\n'));
    } else {
        alert("No notifications.");
    }
}

// Admin options after login
function adminOptions() {
    let choice;
    do {
        choice = prompt("Choose an action:\n1. View all users\n2. Remove a user\n3. Notify all users\n4. Logout");
        if (choice === "1") {
            displayAllUsers();
        } else if (choice === "2") {
            removeUser();
        } else if (choice === "3") {
            notifyAllUsers();
        } else if (choice === "4") {
            alert("Logged out successfully.");
            isAuthenticated = false; // Reset authentication
        } else {
            alert("Invalid option. Please try again.");
        }
    } while (choice !== "4");
}

// Function to start the application
function start() {
    let action;
    while (!isAuthenticated) { // Loop until the user is authenticated
        action = prompt("Choose an action:\n1. Register an account\n2. Log in as a user\n3. Log in as an admin");

        if (action === "1") {
            registerUser(); // User registration
        } else if (action === "2") {
            userLogin(); // User login
        } else if (action === "3") {
            adminLogin(); // Admin logs in
        } else {
            alert("Invalid option. Please try again.");
        }
    }

    // Chatbot functionality can be added here once the user is authenticated
    // For example: initiateChatbot();
}

// Call start to begin the flow
start();
