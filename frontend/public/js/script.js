let copied = false;

// Copy IP to clipboard and show a success message
function copyToClipboard(ip) {
  navigator.clipboard.writeText(ip).then(() => {
    showNotification(`IP ${ip} copied to clipboard!`);
    if (!copied) {
      alert("IP copied to clipboard!");
      copied = true;
    }
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

// Search functionality
function filterServers() {
  const searchQuery = document.getElementById("search-bar").value.toLowerCase();
  const serverClusters = document.querySelectorAll(".server-cluster");

  serverClusters.forEach(cluster => {
    const serverName = cluster.querySelector("h4").textContent.toLowerCase();
    const betaRealms = cluster.querySelectorAll(".beta-realm .realm-name");
    const regularRealms = cluster.querySelectorAll(".regular-realm .realm-name");

    let found = false;

    // Search in server name and realms
    if (serverName.includes(searchQuery)) {
      found = true;
    }

    betaRealms.forEach(realm => {
      if (realm.textContent.toLowerCase().includes(searchQuery)) {
        found = true;
      }
    });

    regularRealms.forEach(realm => {
      if (realm.textContent.toLowerCase().includes(searchQuery)) {
        found = true;
      }
    });

    cluster.style.display = found ? "block" : "none";
  });
}
