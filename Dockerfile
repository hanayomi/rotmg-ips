# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the backend code
COPY backend/ .

# Expose port 3000
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
