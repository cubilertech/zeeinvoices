
# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18

# Set the working directory
WORKDIR /app

# Install only the production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the built application from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Copy the .env file from the build stage to the final image
COPY --from=build /app/.env ./.env

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
