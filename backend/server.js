const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const otherService = require('./other-service');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Command Line Interface (CLI) to add/update servers and realms
const args = process.argv.slice(2);
if (args[0] === 'add-ip') {
  const [command, serverName, realmType, ip] = args;
  otherService.updateServerIP(serverName, realmType, ip);
}
if (args[0] === 'update-realm') {
  const [command, serverName, realmType, realmName] = args;
  otherService.updateRealmName(serverName, realmType, realmName);
}
