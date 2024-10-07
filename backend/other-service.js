function updateServerIP(serverName, realmType, ip) {
  // Logic for updating server IP
  console.log(`Server ${serverName} updated for ${realmType} with IP ${ip}`);
}

function updateRealmName(serverName, realmType, realmName) {
  // Logic for updating realm names
  console.log(`Server ${serverName} updated for ${realmType} with realm name ${realmName}`);
}

module.exports = {
  updateServerIP,
  updateRealmName
};
