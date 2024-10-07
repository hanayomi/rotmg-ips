// Data structure holding all servers and their IPs
const servers = {
    "USEast": { /* ...full server data as defined earlier... */ },
    "USEast2": { /* ... */ },
    "USMidWest": { /* ... */ },
    "USMidWest2": { /* ... */ },
    // Add remaining servers from the provided list...
};

// Function to render all servers dynamically on the page
function renderServers() {
    const usServerGroup = document.getElementById('us-server-group');
    const euServerGroup = document.getElementById('eu-server-group');
    const globalServerGroup = document.getElementById('global-server-group');

    Object.keys(servers).forEach(serverName => {
        const serverData = servers[serverName];
        const clusterDiv = createServerCluster(serverName, serverData);

        if (serverName.startsWith('US')) {
            usServerGroup.appendChild(clusterDiv);
        } else if (serverName.startsWith('EU')) {
            euServerGroup.appendChild(clusterDiv);
        } else {
            globalServerGroup.appendChild(clusterDiv);
        }
    });
}

// Helper function to create a server cluster div element
function createServerCluster(serverName, serverData) {
    const clusterDiv = document.createElement('div');
    clusterDiv.classList.add('server-cluster');
    
    const h4 = document.createElement('h4');
    h4.textContent = serverName;
    clusterDiv.appendChild(h4);

    // Nexus button
    const nexusBtn = createRealmButton('Nexus', serverData.nexus);
    clusterDiv.appendChild(nexusBtn);

    // Beta Realms
    Object.keys(serverData.betaRealms).forEach(betaRealm => {
        const betaBtn = createRealmButton(betaRealm, serverData.betaRealms[betaRealm]);
        clusterDiv.appendChild(betaBtn);
    });

    // Old Realm
    Object.keys(serverData.oldRealm).forEach(oldRealm => {
        const oldRealmBtn = createRealmButton(oldRealm, serverData.oldRealm[oldRealm]);
        clusterDiv.appendChild(oldRealmBtn);
    });

    return clusterDiv;
}

// Helper function to create a button for a realm with its IP
function createRealmButton(realmName, ip) {
    const button = document.createElement('button');
    button.classList.add('copy-btn');
    button.textContent = realmName;
    button.setAttribute('data-ip', ip);
    button.onclick = () => copyToClipboard(ip);
    return button;
}

// Copy IP to clipboard and show a success message
function copyToClipboard(ip) {
    navigator.clipboard.writeText(ip).then(() => {
        showNotification(`IP ${ip} copied to clipboard!`);
    });
}

// Show notification after copying IP
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

// Enhanced search functionality
function filterServers() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const serverClusters = document.querySelectorAll(".server-cluster");

    serverClusters.forEach(cluster => {
        const serverName = cluster.querySelector("h4").textContent.toLowerCase();
        const buttons = cluster.querySelectorAll("button");
        let found = false;

        // Check if server name or any button matches the search query
        if (serverName.includes(searchQuery)) {
            found = true;
        }

        buttons.forEach(button => {
            if (button.textContent.toLowerCase().includes(searchQuery)) {
                found = true;
                if (searchQuery && button.getAttribute('data-ip')) {
                    copyToClipboard(button.getAttribute('data-ip'));
                }
            }
        });

        cluster.style.display = found ? "block" : "none";
    });
}

// Initial rendering of all servers
renderServers();
