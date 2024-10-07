
@echo off
echo Installing dependencies for backend...
cd backend
npm install
npm start

echo Installing dependencies for frontend...
cd ../frontend
npm install

echo Starting the server on localhost...
npx serve -s public
