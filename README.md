# Application d’automatisation d’emails - React + n8n

## Présentation

Ce projet consiste en une application permettant d’automatiser le traitement d’emails à l’aide d’un workflow n8n et d’une interface développée en React.

L’utilisateur peut déclencher un traitement qui simule la réception d’emails, les analyse, génère des réponses automatiques et affiche les résultats dans une interface simple.

## Cas d’usage

Le scénario choisi est la gestion automatique d’emails clients, avec trois types principaux :

* demandes commerciales
* demandes de support
* autres messages

Chaque email est analysé, classé dans une catégorie, puis une réponse adaptée est générée.

## Architecture

Le fonctionnement global est le suivant :

```text
Frontend
   ↓
Webhook n8n
   ↓
Simulation des emails
   ↓
Traitement
   ↓
Réponse du workflow
   ↓
Affichage dans le frontend
```

## Frontend (React)

L’interface permet de :

* lancer le traitement via un bouton
* afficher un indicateur de chargement
* visualiser les emails traités dans un tableau
* filtrer par catégorie ou statut
* trier les résultats par date

### Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

Puis ouvrir :

```
http://localhost:5173
```

## Workflow n8n

Le workflow n8n est responsable de :

* recevoir la requête du frontend
* simuler la récupération d’emails
* appliquer une logique de traitement en JavaScript
* renvoyer les résultats au frontend

### Import du workflow

1. Ouvrir n8n
2. Cliquer sur « Import »
3. Charger le fichier :

```
n8n/workflow.json
```

### Exécution

* Publier le workflow
* Utiliser l’URL de production du webhook :

```
https://mariam.app.n8n.cloud/webhook/email
```

## Logique de traitement

Le traitement repose sur des règles simples :

* détection de mots-clés dans le contenu
* classification en catégories (commercial, support, autre)
* attribution d’un statut (répondu ou ignoré)
* génération d’une réponse automatique

## Affichage des données

Le tableau affiche les informations suivantes :

* date
* expéditeur
* sujet
* catégorie
* statut
* réponse générée

## Mode simulation

Les emails sont simulés dans le workflow n8n via un node Function.
Ce choix permet de simplifier la mise en place.

## Limites

* absence de connexion à un compte Gmail réel
* logique de classification simple (basée sur des mots-clés)

## Améliorations possibles

* intégration de Gmail
* utilisation d’un modèle d’IA pour une meilleure analyse
* stockage des emails en base de données

## Structure du projet

```
project/
│
├── frontend/
├── n8n/
│   └── workflow.json
└── README.md
```

## Choix techniques

* React (Vite) pour une interface rapide à mettre en place
* n8n pour l’orchestration du workflow
* JavaScript pour la logique de traitement
* simulation des emails pour simplifier la démonstration
