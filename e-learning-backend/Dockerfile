# Use Node.js image
FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend files
COPY . .

# Set environment variables, if needed
# ENV PORT=3000

# Expose the port the app runs on
EXPOSE 8080

# Command to start the backend server
CMD ["node", "index.js"]
