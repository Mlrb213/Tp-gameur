# 🎮 TP Vue.js / Nuxt 4 : Jeu de Combat Tour par Tour

Projet réalisé dans le cadre du cours Vue.js par **Mohamed**, **Kletera (Olivier)**, **Benoit** et **Harryson**.

---

## 📌 Présentation du Projet

Ce projet est une application web d'affrontement tour par tour développée avec **Vue.js 3** et **Nuxt 4**. 

L'utilisateur incarne son personnage (un Pokémon/Monstre) et affronte un adversaire géré par l'ordinateur dans une arène de combat rétrogaming. Le jeu inclut la gestion dynamique des barres de vie, des compétences à cooldown, un journal d'actions en temps réel (*Battle Log*) ainsi qu'une mécanique originale de hasard (*Luck or Not*).

---

## 🚀 Technologies & Bibliothèques Utilisées

- **Framework principal** : [Nuxt 4](https://nuxt.com/) (Vue 3 avec Composition API et `<script setup lang="ts">`).
- **Langage** : [TypeScript](https://www.typescriptlang.org/) (Typage des données, interfaces et Programmation Orientée Objet).
- **Styling & CSS** : 
  - [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`.
  - [DaisyUI 5](https://daisyui.com/) pour les composants d'interface de base.
  - **Design Rétro 8-bit** : Inspiré de la librairie `@8bitcn/ui` avec décors pixel-art crantés et la typographie Google Font `Press Start 2P`.
- **Runtime / Package Manager** : [Bun](https://bun.sh/) & Node.js.

---

## 🏗️ Architecture & Découpage du Code

Le projet suit une architecture modulaire et réutilisable :

```
TP-gameur/
├── app/
│   ├── assets/
│   │   └── css/main.css         # Styles globaux, Tailwind CSS v4 & typographie 8-bit
│   ├── components/
│   │   ├── BattleControls.vue   # Composant des boutons d'actions d'interface
│   │   ├── BattleLog.vue        # Composant du journal de combat (Historique tour par tour)
│   │   └── HealhtBar.vue        # Composant de barre de vie dynamique & sprite
│   ├── data/
│   │   ├── monsterData.ts       # Données d'initialisation des monstres
│   │   └── skillsData.ts        # Données d'initialisation des compétences
│   ├── pages/
│   │   ├── battle.vue           # Page principale gérant l'arène et la boucle de jeu
│   │   └── index.vue            # Point d'entrée de l'application
│   └── utils/
│       ├── Monster.ts           # Classe Orientée Objet représentant un Monstre
│       ├── competence.ts        # Classe Orientée Objet représentant une Compétence
│       └── utils.ts             # Fonctions utilitaires (générateur aléatoire)
├── nuxt.config.ts               # Configuration Nuxt 4 et plugins Vite
└── package.json
```

---

## 🧩 Modèle de Données & Classes Métier (POO)

### 1. La Classe `Monster` (`app/utils/Monster.ts`)
Modélise les combattants du jeu avec leurs statistiques et leurs méthodes de calcul de dégâts :
- **Attributs** : `idMonster`, `nameMonster`, `sprite`, `currentHp`, `maxHp`, `attack`, `defense`.
- **Méthodes** :
  - `computeNormalDamage(target)` : Calcule les dégâts d'une attaque normale en fonction de la défense adverse.
  - `computeUltimateDamage(target)` : Calcule les dégâts d'une attaque spéciale/critique (`attack * 2 - defense`).

### 2. La Classe `Skill` (`app/utils/competence.ts`)
Modélise les compétences disponibles pour le joueur :
- **Types** : `'attaque'`, `'special'`, `'heal'`, `'shield'`.
- **Attributs** : `amount`, `maxCharge`, `coolDown`, `currentCoolDown`.
- **Méthodes** :
  - `canUse()` : Vérifie si la compétence est disponible.
  - `use()` : Consomme la compétence et réinitialise son cooldown.
  - `tick()` : Décrémente le cooldown à chaque fin de tour.

---

## 🕹️ Composants UI & Fonctionnalités

### 1. `BattleControls.vue`
Composant d'interface regroupant les 6 boutons d'actions du joueur :
- ⚔️ **Attaque Normale** : Inflige des dégâts de base à l'adversaire.
- ⚡ **Attaque Spéciale** : Attaque puissante disponible tous les 3 tours.
- 💚 **Soin** : Restaure des PV au joueur (limité à 100 PV max).
- 🛡️ **Défense** : Active une posture défensive réduisant de 50% les dégâts subis au tour suivant.
- 🎲 **Luck or Not** : Lance un tirage aléatoire entre 0 et 10 :
  - **Tirage = 0** : Malchance (-10 PV au joueur).
  - **Tirage 1 à 5** : `chiffre x 10` converti en Bouclier.
  - **Tirage 6 à 10** : `(chiffre x 10) / 2` infligé en dégâts et gagné en Bouclier.
- 🏳️ **Abandonner** : Conclut immédiatement la partie sur un abandon.

### 2. `HealhtBar.vue`
Affiche la barre de santé dynamique du personnage. La couleur de la jauge évolue selon le pourcentage de PV restants :
- **Vert** (> 50% PV)
- **Jaune** (20% à 50% PV)
- **Rouge** (< 20% PV)

### 3. `BattleLog.vue`
Affiche le déroulé chronologique de la partie avec surlignage couleur par type d'action et numéro du round en cours.

---

## 🛠️ Installation et Démarrage

### 1. Installation des dépendances
```bash
bun install
# ou
npm install
```

### 2. Démarrage du serveur de développement
```bash
bun run dev
# ou
npm run dev
```
L'application est accessible à l'adresse : **`http://localhost:3000`**

### 3. Compilation pour la production
```bash
bun run build
```

---

*TP Web & Mobile — Vue.js / Nuxt 4*
