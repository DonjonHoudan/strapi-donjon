FROM node:20

# Définir un argument et une variable d'environnement
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Définir le répertoire de travail
WORKDIR /opt/

# Copier les fichiers nécessaires pour les dépendances
COPY package.json package-lock.json ./

# Supprimer les node_modules s'ils existent, puis installer les dépendances
RUN npm install -g node-gyp && \
    npm i && \
    npm ci

# Ajouter les binaires locaux à PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Définir le répertoire pour l'application
WORKDIR /opt/app

# Copier les fichiers de l'application
COPY . .

# Changer les permissions
RUN chown -R node:node /opt/app

# Passer à l'utilisateur "node"
USER node

# Construire l'application
RUN ["npm", "run", "build"]

# Exposer le port
EXPOSE 1337

# Définir le volume pour les uploads (à configurer correctement)
VOLUME /folder/on/host/to/store:/public/uploads

# Lancer l'application
CMD ["npm", "start"]
