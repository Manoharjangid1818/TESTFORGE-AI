FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY public ./public
COPY src ./src

# Build the application
RUN npm run build

# Use nginx to serve the built app
FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
