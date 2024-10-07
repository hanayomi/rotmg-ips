# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the backend code
COPY backend/ .

# Expose port 3000
EXPOSE 3000

# Run the server
CMD ["npm", "start"]
