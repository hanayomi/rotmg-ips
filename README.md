# Realm of the Mad God Server IP Tool

## Overview
This tool provides an interactive interface to view and copy the IP addresses of servers and realms for the game **Realm of the Mad God**. It features a search bar for quickly finding and copying server or realm IP addresses.

### Features:
- Search for servers or realms (e.g., `USEast`, `[BETA] #1`, `Old Realm #1`).
- Copy IP addresses directly from the page.
- Responsive, night-themed design using pastel colors.

## Project Structure

rotmg-ip-tool/ ├── backend/ │ ├── package.json │ ├── routes.js │ ├── server.js │ ├── frontend/ │ ├── package.json │ ├── index.html │ ├── styles.css │ ├── script.js │ ├── .gitignore ├── Dockerfile ├── docker-compose.yaml ├── README.md


### Installation

#### Prerequisites
- **Node.js**: Download and install from [https://nodejs.org/](https://nodejs.org/).
- **Docker**: Install Docker from [https://www.docker.com/](https://www.docker.com/).
- **Git**: Download Git from [https://git-scm.com/](https://git-scm.com/).

#### Clone the repository
```bash
git clone https://github.com/your-username/rotmg-ip-tool.git
cd rotmg-ip-tool


Local Deployment Instructions:

cd backend/npm install
npm run start
cd ../frontend/
npm install
npx serve -s public

Will deploy at http://localhost:3000.