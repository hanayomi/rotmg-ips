const express = require('express');
const router = express.Router();
const otherService = require('./other-service');

// In-memory data structure for servers
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
    // Add other servers...
};

// GET: Retrieve all servers and their IPs
router.get('/servers', (req, res) => {
    res.status(200).json(servers);
});

// POST: Update or add an IP for a server
router.post('/update-ip', (req, res) => {
    const { serverName, realmType, realmName, ip } = req.body;
    servers = otherService.updateServerIP(servers, serverName, realmType, realmName, ip);
    res.status(200).send(`Updated ${serverName} ${realmType} ${realmName} with IP: ${ip}`);
});

// POST: Update Realm Name
router.post('/update-realm-name', (req, res) => {
    const { serverName, realmType, oldName, newName } = req.body;
    servers = otherService.updateRealmName(servers, serverName, realmType, oldName, newName);
    res.status(200).send(`Updated ${serverName} ${realmType} realm name from ${oldName} to ${newName}`);
});

module.exports = router;
