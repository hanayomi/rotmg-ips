// Service to update IPs and Realm Names

// Updates a server's IP for Nexus, [BETA], or Old Realms
function updateServerIP(servers, serverName, realmType, realmName, ip) {
    if (!servers[serverName]) {
        servers[serverName] = { nexus: "", betaRealms: {}, oldRealm: {} };
    }

    if (realmType === "nexus") {
        servers[serverName].nexus = ip;
    } else if (realmType === "[BETA]") {
        servers[serverName].betaRealms[realmName] = ip;
    } else if (realmType === "old") {
        servers[serverName].oldRealm[realmName] = ip;
    }

    return servers;
}

// Updates a Realm's Name for [BETA] or Old Realms
function updateRealmName(servers, serverName, realmType, oldName, newName) {
    if (realmType === "[BETA]" && servers[serverName].betaRealms[oldName]) {
        servers[serverName].betaRealms[newName] = servers[serverName].betaRealms[oldName];
        delete servers[serverName].betaRealms[oldName];
    } else if (realmType === "old" && servers[serverName].oldRealm[oldName]) {
        servers[serverName].oldRealm[newName] = servers[serverName].oldRealm[oldName];
        delete servers[serverName].oldRealm[oldName];
    }

    return servers;
}

module.exports = {
    updateServerIP,
    updateRealmName
};
