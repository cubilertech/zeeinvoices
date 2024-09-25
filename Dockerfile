
# # Stage 1: Build the application
# FROM node:18 AS build

# # Set the working directory
# WORKDIR /app

# # Install dependencies
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Serve the application
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Install only the production dependencies
# COPY package.json package-lock.json ./
# RUN npm install --only=production

# # Copy the built application from the build stage
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/public ./public
# COPY --from=build /app/node_modules ./node_modules

# # Copy the .env file from the build stage to the final image
# COPY --from=build /app/.env ./.env

# # Expose the port Next.js will run on
# EXPOSE 3000

# CMD ["npm", "start"]
# Use an official Node.js runtime as a parent image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lighter image for production
FROM node:18 AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
