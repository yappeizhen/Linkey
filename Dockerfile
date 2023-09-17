# Build the frontend
FROM node:14 AS frontend-builder
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend ./
COPY ./shared /shared
RUN cp -R /shared ./src/shared
RUN npm run build

# Build the backend
FROM node:14 AS backend-builder
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend ./
COPY ./shared /shared
RUN cp -R /shared ./src/shared
RUN npm run build

# Final stage for frontend
FROM nginx:alpine AS frontend
COPY --from=frontend-builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Final stage for backend
FROM node:14 AS backend
WORKDIR /app
COPY --from=backend-builder /app/dist ./dist
COPY ./backend/package*.json ./
RUN npm install --production
EXPOSE 8080
CMD ["npm", "start:dev"]
