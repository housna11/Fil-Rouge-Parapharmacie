# 🛒 ParaPlus – Parapharmacie en ligne

## 📌 Présentation du projet

**ParaPlus** est une application web full-stack de parapharmacie en ligne conçue pour faciliter la vente et la gestion de produits parapharmaceutiques. Elle permet aux clients de parcourir le catalogue, de rechercher et filtrer les produits, de passer des commandes et de partager leurs avis.

Le projet met l’accent sur la simplicité d’utilisation, la sécurité des données grâce à un système d’authentification fiable, ainsi qu’une interface responsive garantissant une expérience optimale sur ordinateurs, tablettes et smartphones.



## 🎯 Objectifs

* Offrir une expérience utilisateur fluide et ergonomique
* Faciliter l’achat et le suivi des commandes en ligne
* Centraliser la gestion des produits, commandes et avis côté administrateur
* Proposer une architecture moderne basée sur une API REST sécurisée



## 👥 Public cible

### Clients

* Consulter le catalogue de produits
* Rechercher et filtrer par catégorie ou mot-clé
* Ajouter des produits au panier
* Passer des commandes (simulation)
* Suivre l’état des commandes
* Laisser des avis et des notes sur les produits

### Administrateurs

* Gérer les produits et catégories
* Gérer les commandes et leurs statuts
* Gérer les utilisateurs et les rôles
* Modérer les avis clients
* Créer et gérer les promotions



## ⚙️ Fonctionnalités principales

### 🔐 Authentification

* Inscription / Connexion / Déconnexion
* Sécurisation via tokens
* Gestion des rôles (client / admin)

### 🧴 Produits

* Affichage sous forme de cartes (image, nom, prix, description)
* Détails d’un produit
* CRUD produits (admin)

### 🗂️ Catégories

* Filtrage des produits par catégorie
* CRUD catégories (admin)

### 🛒 Panier & Commandes

* Ajouter / supprimer des produits du panier
* Calcul du total
* Création de commande
* Suivi des statuts : *En cours*, *Validée*, *Annulée*

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
* **Gestion d’état** : Redux Toolkit
* **UI** : Bootstrap

### Pages principales

* Accueil
* Catalogue
* Fiche produit
* Panier
* Profil client
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
* Lister toutes les commandes (admin)
* Modifier le statut (admin)


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

* Application web fonctionnelle
* Planification jira
  <a href="https://housnafathi.atlassian.net/jira/software/projects/TM/boards/101?atlOrigin=eyJpIjoiNmEyZDE4ODljZTJiNGUxZmFjMDhhODIwNGEyMGU2MGIiLCJwIjoiaiJ9" target="_blank" style="text-decoration:none;">
  <kbd>📄 Voir la planification </kbd>
  </a>
* Cahier des charges
  <a href="https://docs.google.com/document/d/1TMWIRWXHiY7Q_m00OJVrJKTfoYozbaDjt8Ar_OlYCyc/edit?usp=sharing" target="_blank" style="text-decoration:none;">
  <kbd>📄 Cahier des charges</kbd>
  </a>
* Figma
  <a href="https://www.figma.com/design/exHfeTuXVmNT76ujDiSZHj/ParaPlus?node-id=0-1&t=zy6aQfdTzOgSgyAh-1" target="_blank" style="text-decoration:none;">
  <kbd>📄 Maquettes</kbd>
  </a>
* Diagrammes UML
  <a href="https://lucid.app/lucidchart/6ecad017-2c2f-4733-827d-5ce62750c3ea/edit?invitationId=inv_84813b85-2931-4f44-813d-e456de86c8f7" target="_blank" style="text-decoration:none;">
  <kbd>📄 Diagramme de Classe</kbd>
  </a>
  <a href="https://lucid.app/lucidchart/cbbdedd9-f14e-4b71-99f8-645d20fb80f3/edit?invitationId=inv_01c236f8-3e6a-4748-ab78-2e797a4e09ea" target="_blank" style="text-decoration:none;">
  <kbd>📄 Diagramme de Use Case</kbd>
  </a>
* Code source GitHub (Laravel + React)
* Dump base de données (SQL)
* README + guide d’installation
* Rapport de projet
* Présentation de soutenance
* Lien vers l’application déployée



## 👩‍💻 Réalisé par

**HOUSNA FATHI** - Developpeuse web full-stack

**SALMA HARDA** - Formatrice
