<template>
  <div class="min-h-screen bg-stone-100 flex flex-col items-center py-6 px-4 font-pixel">
    <!-- En-tête -->
    <header class="text-center mb-6">
      <h1 class="text-lg sm:text-2xl font-bold text-stone-800 tracking-wider">
        🎮 JEU TOUR PAR TOUR
      </h1>
      <p class="text-[10px] text-stone-500 mt-1">
        TP Vue.js • Mohamed, Kletera, Benoit & Harryson
      </p>
    </header>

    <main class="w-full max-w-2xl flex flex-col gap-6">
      <!-- 1. Barres de Vie & Sprites des Monstres (Composant HealhtBar de Kletera) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Monstre / Adversaire -->
        <HealhtBar
          :id-monster="String(enemyMonster.idMonster)"
          :name-monster="enemyMonster.nameMonster"
          :sprite="enemyMonster.sprite"
          :current-hp="enemyMonster.currentHp"
          :max-hp="enemyMonster.maxHp"
        />

        <!-- Joueur -->
        <HealhtBar
          :id-monster="String(playerMonster.idMonster)"
          :name-monster="playerMonster.nameMonster"
          :sprite="playerMonster.sprite"
          :current-hp="playerMonster.currentHp"
          :max-hp="playerMonster.maxHp"
        />
      </div>

      <!-- 2. Commandes de Combat (Composant BattleControls de Mohamed) -->
      <BattleControls
        :current-round="currentRound"
        :is-game-over="isGameOver"
        :player-hp="playerMonster.currentHp"
        :player-max-hp="playerMonster.maxHp"
        :is-defending="isDefending"
        @attack="handleAttack"
        @attack-spe="handleSpecialAttack"
        @heal="handleHeal"
        @defense="handleDefense"
        @luck="handleLuck"
        @give-up="handleGiveUp"
      />

      <!-- Écran de Fin si Partie Terminée -->
      <div v-if="isGameOver" class="p-4 bg-white rounded-xl border border-stone-300 text-center flex flex-col items-center gap-3">
        <h2 class="text-base font-bold" :class="winner === 'player' ? 'text-emerald-600' : 'text-red-600'">
          {{ winner === 'player' ? '🏆 VICTOIRE !' : winner === 'giveup' ? '🏳️ ABANDON' : '💀 DÉFAITE' }}
        </h2>
        <p class="text-[10px] text-stone-600">
          {{ winner === 'player' ? `Vous avez vaincu ${enemyMonster.nameMonster} !` : `La partie est terminée.` }}
        </p>
        <button
          type="button"
          class="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded cursor-pointer hover:bg-stone-800"
          @click="restartGame"
        >
          🔄 Rejouer
        </button>
      </div>

      <!-- 3. Journal de Combat (Composant BattleLog de Mohamed) -->
      <BattleLog
        :logs="logs"
        @clear="logs = []"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Monster } from '~/utils/Monster'
import { monsters as initialMonsters } from '~/data/monsterData'
import BattleControls from '~/components/BattleControls.vue'
import BattleLog, { type LogItem } from '~/components/BattleLog.vue'
import HealhtBar from '~/components/HealhtBar.vue'

// 1. Initialisation des Monstres basés sur le fichier monsterData.ts de l'équipe
const playerMonster = reactive(new Monster({
  idMonster: initialMonsters[0]?.idMonster ?? 0,
  nameMonster: initialMonsters[0]?.nameMonster ?? 'Joueur',
  sprite: initialMonsters[0]?.sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
  currentHp: initialMonsters[0]?.currentHp ?? 100,
  maxHp: initialMonsters[0]?.maxHp ?? 100,
  attack: initialMonsters[0]?.attack ?? 20,
  defense: initialMonsters[0]?.defense ?? 10
}))

const enemyMonster = reactive(new Monster({
  idMonster: initialMonsters[1]?.idMonster ?? 1,
  nameMonster: initialMonsters[1]?.nameMonster ?? 'Monstre',
  sprite: initialMonsters[1]?.sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  currentHp: initialMonsters[1]?.currentHp ?? 100,
  maxHp: initialMonsters[1]?.maxHp ?? 100,
  attack: initialMonsters[1]?.attack ?? 18,
  defense: initialMonsters[1]?.defense ?? 8
}))

// État de la partie
const currentRound = ref(1)
const isDefending = ref(false)
const winner = ref<null | 'player' | 'enemy' | 'giveup'>(null)
const logs = ref<LogItem[]>([])
let logIdCounter = 0

const isGameOver = computed(() => winner.value !== null)

// Ajout d'une entrée au journal de combat
const addLog = (text: string, type: LogItem['type']) => {
  logs.value.unshift({
    id: ++logIdCounter,
    text,
    type,
    round: currentRound.value
  })
}

// Riposte de l'adversaire
const enemyTurn = () => {
  if (enemyMonster.currentHp <= 0) {
    winner.value = 'player'
    addLog(`🏆 Victoire ! ${enemyMonster.nameMonster} est K.O. !`, 'system')
    return
  }

  let damage = enemyMonster.computeNormalDamage(playerMonster)
  damage = Math.max(1, damage)

  if (isDefending.value) {
    damage = Math.max(1, Math.floor(damage / 2))
    addLog(`🛡️ La défense de ${playerMonster.nameMonster} absorbe 50% des dégâts !`, 'defense')
    isDefending.value = false
  }

  playerMonster.currentHp = Math.max(0, playerMonster.currentHp - damage)
  addLog(`💥 ${enemyMonster.nameMonster} attaque et inflige ${damage} dégâts !`, 'attack')

  if (playerMonster.currentHp <= 0) {
    winner.value = 'enemy'
    addLog(`💀 Défaite ! ${playerMonster.nameMonster} est K.O. !`, 'system')
  }
}

// Actions des Boutons
const handleAttack = () => {
  if (isGameOver.value) return

  const damage = Math.max(1, playerMonster.computeNormalDamage(enemyMonster))
  enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
  addLog(`⚔️ ${playerMonster.nameMonster} attaque et inflige ${damage} dégâts à ${enemyMonster.nameMonster}.`, 'attack')

  if (enemyMonster.currentHp > 0) {
    enemyTurn()
  } else {
    winner.value = 'player'
    addLog(`🏆 Victoire ! ${enemyMonster.nameMonster} est K.O. !`, 'system')
  }

  currentRound.value++
}

const handleSpecialAttack = () => {
  if (isGameOver.value || currentRound.value % 3 !== 0) return

  const damage = Math.max(1, playerMonster.computeUltimateDamage(enemyMonster))
  enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
  addLog(`⚡ ATTAQUE SPÉCIALE ! ${playerMonster.nameMonster} inflige ${damage} dégâts !`, 'attack-spe')

  if (enemyMonster.currentHp > 0) {
    enemyTurn()
  } else {
    winner.value = 'player'
    addLog(`🏆 Victoire ! ${enemyMonster.nameMonster} est K.O. !`, 'system')
  }

  currentRound.value++
}

const handleHeal = () => {
  if (isGameOver.value || playerMonster.currentHp >= playerMonster.maxHp) return

  const healAmount = 25
  const prevHp = playerMonster.currentHp
  playerMonster.currentHp = Math.min(playerMonster.maxHp, playerMonster.currentHp + healAmount)
  const actualHeal = playerMonster.currentHp - prevHp

  addLog(`💚 ${playerMonster.nameMonster} se soigne et récupère ${actualHeal} PV !`, 'heal')

  enemyTurn()
  currentRound.value++
}

const handleDefense = () => {
  if (isGameOver.value) return

  isDefending.value = true
  addLog(`🛡️ ${playerMonster.nameMonster} prépare sa posture défensive !`, 'defense')

  enemyTurn()
  currentRound.value++
}

const handleLuck = () => {
  if (isGameOver.value) return

  const roll = Math.floor(Math.random() * 11)

  if (roll === 0) {
    playerMonster.currentHp = Math.max(0, playerMonster.currentHp - 10)
    addLog(`🎲 Luck or Not (Tirage : 0) -> Malchance ! Le joueur perd 10 PV !`, 'luck')
  } else if (roll >= 1 && roll <= 5) {
    const shield = roll * 10
    addLog(`🎲 Luck or Not (Tirage : ${roll}) -> +${shield} Bouclier gagné !`, 'luck')
  } else if (roll >= 6 && roll <= 10) {
    const value = roll * 10
    const damage = value / 2
    enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
    addLog(`🎲 Luck or Not (Tirage : ${roll}) -> ${damage} dégâts infligés et +${damage} Bouclier !`, 'luck')
  }

  if (playerMonster.currentHp <= 0) {
    winner.value = 'enemy'
  } else if (enemyMonster.currentHp <= 0) {
    winner.value = 'player'
  } else {
    enemyTurn()
  }

  currentRound.value++
}

const handleGiveUp = () => {
  if (isGameOver.value) return

  winner.value = 'giveup'
  addLog(`🏳️ Le joueur a abandonné la partie.`, 'give-up')
}

const restartGame = () => {
  playerMonster.currentHp = playerMonster.maxHp
  enemyMonster.currentHp = enemyMonster.maxHp
  currentRound.value = 1
  isDefending.value = false
  winner.value = null
  logs.value = []
  addLog(`⚔️ Nouvelle partie démarrée !`, 'system')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', monospace, sans-serif;
}
</style>
