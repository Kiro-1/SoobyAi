// Admin credentials
const adminUsername = 'kiro-1'; // Change this to your desired username
const adminPassword = 'Kirosite5'; // Change this to your desired password

let isAuthenticated = false; // Variable to track if a user is authenticated
let isMaintenance = false; // Variable to track maintenance mode

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
    if (isMaintenance) {
        alert("The system is under maintenance. Please try again later.");
        return;
    }

    while (true) { // Keep asking until successful
        const username = prompt("Enter your username:");
        const password = prompt("Enter your password:");

        const user = authenticateUser(username, password);
        if (user) {
            alert("Login successful! Welcome back!");
            isAuthenticated = true; // Set authentication to true
            console.log(`User ${username} logged in.`);
            logUserActivity(username, "login"); // Log user activity
            displayNotifications(); // Show notifications after logging in

            // New feature: ask user for their choice
            let choice = prompt("Choose an option:\n1. Use Chatbot\n2. Provide Feedback");
            if (choice === "1") {
                useChatbot(); // Redirect to chatbot
            } else if (choice === "2") {
                giveFeedback(username); // Collect feedback
            } else {
                alert("Invalid option selected.");
            }
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

// Function to toggle maintenance mode
function toggleMaintenance() {
    isMaintenance = !isMaintenance; // Toggle maintenance mode

    if (isMaintenance) {
        alert("Maintenance mode is now ON. All users will be logged out.");
        logoutAllUsers(); // Log out all users when maintenance starts
    } else {
        alert("Maintenance mode is now OFF. Users can log in again.");
    }
}

// Function to log out all users
function logoutAllUsers() {
    isAuthenticated = false;
    console.log("All users have been logged out due to maintenance.");
}

// Function to log user activity
function logUserActivity(username, activity) {
    let userActivityLog = JSON.parse(localStorage.getItem('userActivityLog')) || [];

    const timestamp = new Date().toLocaleString();
    userActivityLog.push({ username, activity, timestamp });
    localStorage.setItem('userActivityLog', JSON.stringify(userActivityLog));

    console.log(`User activity logged: ${username} - ${activity} at ${timestamp}`);
}

// Function to view user activity log (Admin only)
function viewUserActivityLog() {
    let userActivityLog = JSON.parse(localStorage.getItem('userActivityLog')) || [];

    if (userActivityLog.length === 0) {
        alert("No user activities recorded.");
    } else {
        console.log("User Activity Log:", userActivityLog);
        alert(`User Activity Log:\n${userActivityLog.map(log => `${log.username}: ${log.activity} at ${log.timestamp}`).join('\n')}`);
    }
}

// Function to give feedback and rate the app
function giveFeedback(username) {
    const rating = prompt("Please rate the app from 1 to 5:");
    const feedback = prompt("Please provide your feedback:");

    // Store feedback in local storage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ username, rating, feedback });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    alert("Thank you for your feedback!");
}

// Admin options after login
function adminOptions() {
    let choice;
    do {
        choice = prompt("Choose an action:\n1. View all users\n2. Remove a user\n3. Notify all users\n4. Toggle maintenance mode\n5. View user activity log\n6. View user ratings\n7. Logout");
        if (choice === "1") {
            displayAllUsers();
        } else if (choice === "2") {
            removeUser();
        } else if (choice === "3") {
            notifyAllUsers();
        } else if (choice === "4") {
            toggleMaintenance(); // Toggle maintenance mode
        } else if (choice === "5") {
            viewUserActivityLog(); // View user activity log
        } else if (choice === "6") {
            viewUserRatings(); // New option to view user ratings
        } else if (choice === "7") {
            alert("Logged out successfully.");
            isAuthenticated = false; // Reset authentication
        } else {
            alert("Invalid option. Please try again.");
        }
    } while (choice !== "7");
}

// Function to view user ratings
function viewUserRatings() {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    if (feedbacks.length === 0) {
        alert("No feedback available.");
    } else {
        alert("User Ratings:\n" + feedbacks.map(f => `${f.username}: Rating ${f.rating}, Feedback: ${f.feedback}`).join('\n'));
    }
}

// Function to start the chatbot
function useChatbot() {
    const message = prompt("Enter your message to the chatbot:");
    // Add your chatbot processing logic here
    processMessage(message); // Call your existing chatbot function
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

    // Optionally, you can add any startup functionality for the chatbot here
}

// Call start to begin the flow
start();
        
