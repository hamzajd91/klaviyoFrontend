# Stage 1: Build the Next.js app
FROM node:21.7.1-alpine AS build

WORKDIR /FrontendApp

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application code
COPY . .

# Build the Next.js app (creates the .next folder)
RUN npm run build

# Stage 2: Serve the production build with 'next start'
FROM node:21.7.1-alpine AS production

WORKDIR /FrontendApp

# Copy necessary files from the build stage
COPY --from=build /FrontendApp/package.json ./package.json
COPY --from=build /FrontendApp/public ./public
COPY --from=build /FrontendApp/.next ./.next
COPY --from=build /FrontendApp/node_modules ./node_modules

# OR
# Expose the port Next.js will run on (default 3000)
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
