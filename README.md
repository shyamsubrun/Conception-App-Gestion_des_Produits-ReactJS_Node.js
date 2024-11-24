# **Gestion des Produits - ReactJS & Node.js**

## **Description du Projet**
Ce projet est une solution complète de gestion des produits utilisant **ReactJS** pour le front-end et **Node.js** avec **Express** pour le back-end. L'application permet aux utilisateurs de visualiser, ajouter, modifier et supprimer des produits en toute simplicité. Elle inclut des fonctionnalités avancées comme l'authentification JWT et la gestion de l'état global avec Redux.

---

## **Caractéristiques Principales**
1. **Back-End (API REST)**
   - Créé avec **Node.js** et **Express**.
   - Connecté à une base de données **MongoDB** pour gérer les produits.
   - Sécurisé avec **JWT (JSON Web Tokens)** pour les requêtes authentifiées.

2. **Front-End (Interface Utilisateur)**
   - Développé avec **ReactJS**.
   - Utilise **Material-UI** pour une interface moderne et responsive.
   - Gestion de l'état centralisée avec **Redux**.

3. **Authentification JWT**
   - **Identifiant :** `test@example.com`
   - **Mot de passe :** `test1234`
   - Les utilisateurs doivent se connecter pour accéder aux fonctionnalités.

4. **CRUD Produits**
   - **Lister les produits :** Affiche les produits dans une table.
   - **Ajouter un produit :** Formulaire pour créer un nouveau produit.
   - **Modifier un produit :** Édition directe des champs dans la liste.
   - **Supprimer un produit :** Bouton pour retirer un produit de la base de données.

---

## **Choix des Implémentations**
1. **JWT (Json Web Token)**
   - **Pourquoi ?**
     - Sécuriser l'accès à l'API.
     - Fournir une authentification basée sur des tokens pour les utilisateurs.
   - **Avantage :**
     - Le token est stocké localement (localStorage), ce qui permet une gestion des sessions utilisateur.

2. **Redux**
   - **Pourquoi ?**
     - Centraliser l'état de l'application pour une gestion efficace des données.
   - **Avantage :**
     - Simplifie le flux des données entre les composants et permet des actions globales comme la récupération des produits.

3. **WebSocket avec Socket.IO (Axe d'Amélioration)**
   - **Pourquoi ?**
     - Permettre une synchronisation en temps réel entre les utilisateurs (ex. mise à jour automatique des produits).
   - **Avantage :**
     - Optimise l'expérience utilisateur, surtout pour les applications multi-utilisateurs.

---

## **Technologies Utilisées**
### **Back-End**
- **Framework :** Node.js + Express.
- **Base de Données :** MongoDB (via Mongoose).
- **Sécurisation :** JWT.

### **Front-End**
- **Framework :** ReactJS.
- **UI/Design :** Material-UI.
- **Gestion d'État :** Redux.
- **Requêtes HTTP :** Axios.

---

## **Instructions pour Lancer le Projet**

### **1. Clonez le projet**
```bash
git clone https://github.com/votre-dépôt.git
cd votre-dépôt
