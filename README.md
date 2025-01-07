# Projet Vue 3 avec Vite et Express.js

Ce projet est divisé en deux parties principales :

1. **Frontend** : Une application Vue 3 utilisant Vite pour un développement rapide et une interface utilisateur moderne.
2. **Backend** : Un serveur Express.js permettant de gérer une API REST ou un serveur web.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org) (v16 ou supérieur recommandé)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation Générale

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Oreilleu/Challenge-M1-S2
   ```
2. Naviguez dans le répertoire du projet :
   ```bash
   cd Challenge-M1-S2
   ```

Le projet contient deux dossiers principaux :

- **frontend/** : Contient l'application Vue 3.
- **backend/** : Contient le serveur Express.js.

### Configuration du Frontend

1. Naviguez dans le dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrez votre navigateur et accédez à `http://localhost:5173`.

### Configuration du Backend

1. Naviguez dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement ou de production :
   - En développement :
     ```bash
     npm run dev
     ```
   - En production :
     ```bash
     npm run build
     npm run start
     ```
4. Le serveur sera accessible par défaut sur `http://localhost:3000`.

### Variables d'environnement

Chaque dossier (`frontend` et `backend`) contient un fichier `.env.example` qui fournit un modèle pour les variables d'environnement nécessaires. Copiez ce fichier en `.env` et modifiez les valeurs en fonction de votre configuration locale.

```bash
# Exemple pour copier le fichier dans chaque dossier
cp .env.example .env
```

