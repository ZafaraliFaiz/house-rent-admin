# Stage 1: Build the React app
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Add npm config to speed up install
COPY .npmrc .npmrc

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies with retry logic
RUN npm install --omit=dev --prefer-offline --no-audit --progress=false

# Copy rest of the app
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Clean default html
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Expose and run
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
