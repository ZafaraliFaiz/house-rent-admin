# Stage 1: Build the React app
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Optional: Copy .npmrc if it exists (skip error if not)
# You can keep this in Jenkins as a secret if needed
# Use shell form to avoid COPY error if file is missing
# Commented out unless needed explicitly
# COPY .npmrc .npmrc

# Copy only package files to leverage Docker cache
COPY package*.json ./

# Install dependencies (no dev, no audit, no progress for CI speed)
RUN npm ci --omit=dev --prefer-offline --no-audit --progress=false

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Clean default html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
