# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Install dependencies
RUN npm install

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
