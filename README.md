# 🛒 ParaPlus – Parapharmacie en ligne

## 📌 Présentation du projet

**ParaPlus** est une plateforme e-commerce de parapharmacie en ligne permettant aux clients de consulter, filtrer et commander des produits. Les administrateurs disposent d’un tableau de bord centralisé pour gérer les produits.

Le projet vise à proposer une solution **simple**, et **sécurisée**.


## 🎯 Objectifs

* Offrir une expérience utilisateur fluide et ergonomique
* Faciliter l’achat 
* Centraliser la gestion des produits 
* Proposer une architecture moderne basée sur une API REST sécurisée


## 👥 Public cible

### Clients

* Consulter le catalogue de produits
* Rechercher et filtrer par marque ou mot-clé
* Ajouter des produits au panier
* Passer des commandes (simulation)

### Administrateurs

* Gérer les produits (CRUD)
* Gérer les utilisateurs et les rôles


## ⚙️ Fonctionnalités principales

### 🔐 Authentification

* Inscription / Connexion / Déconnexion
* Sécurisation via tokens
* Gestion des rôles (client / admin)

### 🧴 Produits

* Affichage sous forme de cartes (image, marque, stock, nom, prix, description)
* Détails d’un produit
* CRUD produits (admin)

### 🗂️ Catégories

* Filtrage des produits par marque
* CRUD catégories (admin)

### 🛒 Panier & Commandes

* Ajouter / supprimer des produits du panier
* Calcul du total
* Création de commande

### ⭐ Avis clients

* Ajout d’avis avec note et commentaire
* Consultation des avis par produit
* Suppression des avis inappropriés (admin)


## 🧱 Architecture technique

### Backend (API)

* **Framework** : Laravel 10+
* **Base de données** : MySQL
* **ORM** : Eloquent
* **Authentification** : Laravel Breeze + Sanctum
* **Gestion des rôles** : Laratrust
* **Architecture** : MVC (API REST)

### Frontend

* **Framework** : React.js 18+
* **Gestion d’état** : Zustand
* **UI** : Tailwind Css

### Pages principales

* Accueil
* Catalogue
* Fiche produit
* Panier
* Dashboard administrateur


## 🔌 API REST – Endpoints principaux

### Authentification

* Inscription
* Connexion
* Déconnexion

### Produits

* Lister les produits
* Voir les détails
* Créer / Modifier / Supprimer (admin)

### Catégories

* Lister
* Créer / Modifier / Supprimer (admin)

### Commandes

* Créer une commande (client)

### Avis

* Ajouter un avis
* Lister les avis par produit
* Supprimer un avis (admin)

### Utilisateurs

* Lister les utilisateurs (admin)
* Gérer les rôles

🔒 L’API est sécurisée avec **Sanctum** et protégée par les rôles.


## 🚀 Déploiement

* **Conteneurisation** : Docker (Backend, Frontend, Base de données)
* **CI/CD** : GitHub Actions
* **Hébergement** : Render / Railway ou équivalent


## 🗓️ Planification du projet

1. Analyse et cahier des charges
2. Maquettage (desktop & mobile)
3. Développement Backend (API, Auth, CRUD)
4. Développement Frontend
5. Tests unitaires et d’intégration
6. Déploiement et documentation


## 📦 Livrables

- ✅ **Application web fonctionnelle**

- 📅 **Planification Jira**  
  👉 [Voir la planification](https://housnafathi.atlassian.net/jira/software/c/projects/FR/boards/2/backlog?selectedIssue=FR-72)

- 📄 **Cahier des charges**  
  👉 [Consulter le cahier des charges](https://docs.google.com/document/d/1TMWIRWXHiY7Q_m00OJVrJKTfoYozbaDjt8Ar_OlYCyc/edit)

- 🎨 **Maquettes Figma**  
  👉 [Voir les maquettes](https://www.figma.com/design/exHfeTuXVmNT76ujDiSZHj/ParaPlus)

- 📊 **Diagrammes UML**
  - 👉 [Diagramme de classes](https://lucid.app/lucidchart/691bbc5c-e810-41e3-a62f-a58d16902d6b/edit)
  - 👉 [Diagramme de cas d’utilisation](https://lucid.app/lucidchart/cbbdedd9-f14e-4b71-99f8-645d20fb80f3/edit)


- 📘 **README + Guide d’installation**

- 📝 **Rapport de projet**

- 🎤 **Présentation de soutenance**

- 🌐 **Lien vers l’application déployée**


## 👩‍💻 Réalisé par

- **HOUSNA FATHI** – Développeuse web full-stack  
- **SALMA HARDA** – Formatrice



