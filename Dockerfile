# -------------------------------------------------------------
# Stage 1: Dépendances & Environnement Node
# -------------------------------------------------------------
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# -------------------------------------------------------------
# Target "dev" : Pour Docker Compose Watch / Hot Reload (HMR)
# -------------------------------------------------------------
FROM base AS dev
COPY . .
EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "1500"]

# -------------------------------------------------------------
# Target "build" : Compilation des fichiers statiques
# -------------------------------------------------------------
FROM base AS build
COPY . .
RUN npm run build -- --configuration development

# -------------------------------------------------------------
# Target "prod" : Image finale Nginx ultra-légère (Runtime prod)
# -------------------------------------------------------------
FROM nginx:alpine AS prod
COPY --from=build /app/dist/AdminWp/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
