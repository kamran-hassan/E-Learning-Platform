# Use Node.js image
FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# VOLUME ["/app/uploads"]

# Copy quick-bucket files
COPY . .

# Set environment variables, if needed

# Expose the port or ports the app requires
EXPOSE 9999

# Command to start the quick-bucket service
CMD ["node", "index.js"]
