
// Data structure holding all servers and their IPs
const servers = {
    "USEast": { /* ...server data... */ },
    "USEast2": { /* ... */ },
    "USMidWest": { /* ... */ },
    "USMidWest2": { /* ... */ },
    // Add remaining servers from the provided list...
};

// Flag to track if the success notification has been shown
let copyNotificationShown = false;

// Helper function to normalize search query (lowercase, remove spaces)
function normalizeSearchQuery(query) {
    return query.toLowerCase().replace(/\s+/g, '');
}

// Helper function to check for matching server names
function matchesServerName(serverName, query) {
    const abbreviations = {
        "uswest": "usw",
        "useast": "use",
        "usmidwest": "usmw",
        "ussouthwest": "ussw",
        "usnorthwest": "usnw",
        "eusouthwest": "eusw",
        "euwest": "euw",
        "asia": "asia",
        "australia": "aus"
    };

    const normalizedServerName = normalizeSearchQuery(serverName);

    // Check if query matches the server name directly
    if (normalizedServerName.includes(query)) {
        return true;
    }

    // Check if query matches the abbreviation for the server
    const abbreviation = abbreviations[normalizedServerName];
    if (abbreviation && query.startsWith(abbreviation)) {
        return true;
    }

    return false;
}

// Enhanced search functionality
function filterServers() {
    const searchQuery = normalizeSearchQuery(document.getElementById("search-bar").value);
    const serverClusters = document.querySelectorAll(".server-cluster");

    serverClusters.forEach(cluster => {
        const serverName = cluster.querySelector("h4").textContent;
        const normalizedServerName = normalizeSearchQuery(serverName);
        const buttons = cluster.querySelectorAll("button");
        let found = false;

        // Check if the server name matches the search query or an abbreviation
        if (matchesServerName(serverName, searchQuery)) {
            found = true;
        }

        // Check if the search query matches any of the realm names within this server
        buttons.forEach(button => {
            const realmName = button.textContent;
            const normalizedRealmName = normalizeSearchQuery(realmName);

            // Check if the query matches the server realm combination
            if (normalizedRealmName.includes(searchQuery)) {
                found = true;
            }
        });

        // Show or hide the cluster based on whether a match was found
        cluster.style.display = found ? "block" : "none";
    });
}

// Function to copy IP to clipboard and show success notification once per page load
function copyToClipboard(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        // Show the notification only if it hasn't been shown yet
        if (!copyNotificationShown) {
            showNotification(`IP ${ip} copied to clipboard!`);
            copyNotificationShown = true; // Mark that the notification has been shown
        }
    });
}

// Function to display the notification
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

// Initial rendering of all servers
renderServers();
