const express = require('express');
const router = express.Router();

// In-memory data structure to hold servers and their IPs
let servers = {
    "USEast": {
        nexus: "54.234.226.24",
        betaRealms: {
            "[BETA] #1": "54.209.152.223",
            "[BETA] #2": "54.196.48.20"
        },
        oldRealm: {
            "Old Realm #1": "54.144.164.168"
        }
    },
    "USWest": {
        nexus: "54.86.47.176",
        betaRealms: {
            "[BETA] #1": "52.55.11.175",
            "[BETA] #2": "54.165.81.87"
        },
        oldRealm: {
            "Old Realm #1": "54.165.81.87"
        }
    }
    // Add more servers and IPs as needed...
};

// Route to get the list of all servers and IPs
router.get('/servers', (req, res) => {
    res.status(200).json(servers);
});

// Route to update/add a new IP for a server
router.post('/update-ip', (req, res) => {
    const { serverName, realmType, realmName, ip } = req.body;

    // Ensure the server exists, if not, create it
    if (!servers[serverName]) {
        servers[serverName] = { nexus: "", betaRealms: {}, oldRealm: {} };
    }

    // Update or add IP based on realmType
    if (realmType === "nexus") {
        servers[serverName].nexus = ip;
    } else if (realmType === "[BETA]") {
        servers[serverName].betaRealms[realmName] = ip;
    } else if (realmType === "old") {
        servers[serverName].oldRealm[realmName] = ip;
    }

    res.status(200).send(`Updated ${serverName} ${realmType} ${realmName} with IP: ${ip}`);
});

// Route to update the names for [BETA] and old realms
router.post('/update-realm-name', (req, res) => {
    const { serverName, realmType, newName, ip } = req.body;

    // Ensure the server exists, if not, respond with error
    if (!servers[serverName]) {
        return res.status(404).send("Server not found");
    }

    // Update the name and associated IP based on realmType
    if (realmType === "[BETA]") {
        const existingBetaRealms = Object.keys(servers[serverName].betaRealms);
        if (existingBetaRealms.length < 2) {
            servers[serverName].betaRealms[newName] = ip;
        } else {
            // Automatically replace the oldest [BETA] realm if two exist
            delete servers[serverName].betaRealms[existingBetaRealms[0]];
            servers[serverName].betaRealms[newName] = ip;
        }
    } else if (realmType === "old") {
        servers[serverName].oldRealm = { [newName]: ip };
    }

    res.status(200).send(`Updated ${realmType} realm for ${serverName} to: ${newName} with IP: ${ip}`);
});

module.exports = router;
