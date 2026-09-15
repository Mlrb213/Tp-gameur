<template>
  <div class="min-h-screen bg-stone-100 flex flex-col items-center py-6 px-4 font-pixel">
    <!-- En-tête de la Page Battle -->
    <header class="text-center mb-6">
      <h1 class="text-lg sm:text-2xl font-bold text-stone-800 tracking-wider">
        ⚔️ BATTLE ARENA
      </h1>
      <p class="text-[10px] text-stone-500 mt-1">
        Page Battle.vue • Initialisation des Classes & Combat Tour par Tour
      </p>
    </header>

    <main class="w-full max-w-2xl flex flex-col gap-6">
      <!-- 1. Affichage des Barres de Vie & Monstres (Composant HealhtBar de Kletera) -->
      <div class="flex flex-col gap-3">
        <!-- Monstre Adversaire -->
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

        <div class="card bg-base-100 w-auto p-5 shadow-sm">
          <form @submit.prevent="addComment">
              <label for="comment" class="label mb-2">Laisser un commentaire :</label>
              <input 
                v-model="newComment"
                @keydown="onKey"
                type="text"
                id="comment"
                placeholder="Ici commentaire" 
                class="input">
              <button class='btn btn-primary'>Commenter</button>
          </form>
          <div id="commentaire" class="mt-4 flex flex-col gap-2">
            <p v-for="(c, i) in comments" :key="i" class="p-2 bg-base-200 rounded">
              {{ c }}
            </p>
          </div>
        </div>
      </div>

      <!-- Statut du Bouclier -->
      <div v-if="playerShield > 0" class="text-center text-xs text-sky-700 bg-sky-50 py-1 rounded border border-sky-200">
        🛡️ Bouclier actif : +{{ playerShield }} PV absorbés
      </div>

      <!-- 2. Contrôles de Combat & Boutons (Composant BattleControls de Mohamed) -->
      <BattleControls
        :current-round="currentRound"
        :is-game-over="isGameOver"
        :player-hp="playerMonster.currentHp"
        :player-max-hp="playerMonster.maxHp"
        :is-defending="isDefending"
        :is-special-ready="skillSpecial.canUse()"
        :special-cooldown="skillSpecial.currentCoolDown"
        @attack="executeAttack"
        @attack-spe="executeSpecialAttack"
        @heal="executeHeal"
        @defense="executeDefense"
        @luck="executeLuck"
        @give-up="executeGiveUp"
      />

      <!-- Écran de Fin de Combat -->
      <div v-if="isGameOver" class="p-6 bg-white rounded-xl border border-stone-300 text-center flex flex-col items-center gap-3 animate-fade-in shadow-md">
        <h2 class="text-xl font-bold" :class="winner === 'player' ? 'text-emerald-600' : 'text-red-600'">
          {{ winner === 'player' ? '🏆 VICTOIRE !' : winner === 'giveup' ? '🏳️ ABANDON' : '💀 DÉFAITE' }}
        </h2>
        <p class="text-[11px] text-stone-600">
          {{ winner === 'player' ? `${enemyMonster.nameMonster} a été vaincu !` : `Le combat est terminé.` }}
        </p>
        <button
          type="button"
          class="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded cursor-pointer transition-colors"
          @click="restartBattle"
        >
          🔄 Recommencer le combat
        </button>
      </div>

      <!-- 3. Journal de Combat (Composant BattleLog de Mohamed) -->
      <BattleLog
        :logs="logs"
        @clear="logs = []"
      />
    </main>
  </div>
  <div
    v-if="showCheatVideo"
    class="fixed inset-0 z-50 bg-black flex items-center justify-center"
  >
    <iframe
      class="w-full h-full max-w-6xl max-h-[80vh]"
      :src="`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=0&modestbranding=1&rel=0`"
      allow="autoplay; encrypted-media"
      frameborder="0"
    />
    <button
      class="absolute top-4 right-4 text-white text-xl bg-red-600 px-3 py-1 rounded"
      @click="endCheatVideo"
    >
      Skip ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch} from 'vue'
import { Monster } from '~/utils/Monster'
import { Skill } from '~/utils/competence'
import { monsters } from '~/data/monsterData'
import { skills } from '~/data/skillsData'
import BattleControls from '~/components/BattleControls.vue'
import BattleLog, { type LogItem } from '~/components/BattleLog.vue'
import HealhtBar from '~/components/HealhtBar.vue'

// -------------------------------------------------------------
// 1. Initialisation du Combat à partir des Classes & Data
// -------------------------------------------------------------
const playerMonster :Monster = reactive(new Monster({
  idMonster: monsters[0]?.idMonster ?? 0,
  nameMonster: monsters[0]?.nameMonster ?? 'Bulbizarre',
  sprite: monsters[0]?.sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  currentHp: monsters[0]?.currentHp ?? 100,
  maxHp: monsters[0]?.maxHp ?? 100,
  attack: monsters[0]?.attack ?? 20,
  defense: monsters[0]?.defense ?? 10
}))

const enemyMonster : Monster = reactive(new Monster({
  idMonster: monsters[1]?.idMonster ?? 1,
  nameMonster: monsters[1]?.nameMonster ?? 'Roucool',
  sprite: monsters[1]?.sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
  currentHp: monsters[1]?.currentHp ?? 100,
  maxHp: monsters[1]?.maxHp ?? 100,
  attack: monsters[1]?.attack ?? 18,
  defense: monsters[1]?.defense ?? 8
}))

// Instances des compétences issues de l'objet skills de l'équipe
const skillAttack = reactive(new Skill(skills.basicAttack))
const skillSpecial = reactive(new Skill(skills.SpecialAttack))
const skillHeal = reactive(new Skill(skills.heal))
const skillShield = reactive(new Skill(skills.shield))
const skillLuck = reactive(new Skill(skills.luck))

// États de la Page Battle
const currentRound = ref(1)
const playerShield = ref(0)
const isDefending = ref(false)
const winner = ref<null | 'player' | 'enemy' | 'giveup'>(null)
const logs = ref<LogItem[]>([])
let logIdCounter = 0

const isGameOver = computed(() => winner.value !== null)

// Ajouter un événement dans le BattleLog
const addLog = (text: string, type: LogItem['type']) => {
  logs.value.unshift({
    id: ++logIdCounter,
    text,
    type,
    round: currentRound.value
  })
}

// Tick sur les cooldowns des compétences à la fin d'un tour
const tickSkills = () => {
  skillSpecial.tick()
  skillHeal.tick()
  skillShield.tick()
  skillLuck.tick()
}

// Riposte automatique du monstre ennemi
const enemyTurn = () => {
  if (enemyMonster.currentHp <= 0) {
    winner.value = 'player'
    addLog(`🏆 ${enemyMonster.nameMonster} est K.O. ! Victoire !`, 'system')
    return
  }

  let rawDamage = enemyMonster.computeNormalDamage(playerMonster)
  let damage = Math.max(1, rawDamage)

  // Prise en compte du bouclier et de la posture défensive
  if (playerShield.value > 0) {
    const absorbed = Math.min(playerShield.value, damage)
    playerShield.value -= absorbed
    damage -= absorbed
    addLog(`🛡️ Le bouclier absorbe ${absorbed} dégâts !`, 'defense')
  }

  if (isDefending.value && damage > 0) {
    damage = Math.max(1, Math.floor(damage / 2))
    addLog(`🛡️ Posture défensive : Dégâts réduits de moitié !`, 'defense')
    isDefending.value = false
  }

  if (damage > 0) {
    playerMonster.currentHp = Math.max(0, playerMonster.currentHp - damage)
    addLog(`💥 ${enemyMonster.nameMonster} riposte et inflige ${damage} dégâts !`, 'attack')
  }

  if (playerMonster.currentHp <= 0) {
    winner.value = 'enemy'
    addLog(`💀 ${playerMonster.nameMonster} est K.O. ! Défaite !`, 'system')
  }
}

// -------------------------------------------------------------
// 2. Méthodes appelées au clic sur les Boutons
// -------------------------------------------------------------

// ⚔️ Attaque Normale
const executeAttack = () => {
  if (isGameOver.value) return
  if (!skillAttack.canUse()) return

  skillAttack.use()
  const damage = Math.max(1, playerMonster.computeNormalDamage(enemyMonster))
  enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
  addLog(`⚔️ ${playerMonster.nameMonster} utilise ${skillAttack.nameSkills} et inflige ${damage} dégâts.`, 'attack')

  if (enemyMonster.currentHp > 0) {
    enemyTurn()
  } else {
    winner.value = 'player'
    addLog(`🏆 Victoire ! ${enemyMonster.nameMonster} est K.O. !`, 'system')
  }

  tickSkills()
  currentRound.value++
}

// ⚡ Attaque Spéciale (Ultime disponible tous les 2 tours et reste si non utilisée)
const executeSpecialAttack = () => {
  if (isGameOver.value) return
  if (!skillSpecial.canUse()) return

  skillSpecial.use() // Réinitialise currentCoolDown = coolDown (2)
  const damage = Math.max(1, playerMonster.computeUltimateDamage(enemyMonster))
  enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
  addLog(`⚡ ATTAQUE SPÉCIALE ! ${playerMonster.nameMonster} inflige ${damage} dégâts critiques !`, 'attack-spe')

  if (enemyMonster.currentHp > 0) {
    enemyTurn()
  } else {
    winner.value = 'player'
    addLog(`🏆 Victoire ! ${enemyMonster.nameMonster} est K.O. !`, 'system')
  }

  tickSkills()
  currentRound.value++
}

// 💚 Soin
const executeHeal = () => {
  if (isGameOver.value || playerMonster.currentHp >= playerMonster.maxHp) return
  if (!skillHeal.canUse()) return

  skillHeal.use()
  const healAmount = skillHeal.amount
  const prevHp = playerMonster.currentHp
  playerMonster.currentHp = Math.min(playerMonster.maxHp, playerMonster.currentHp + healAmount)
  const actualHeal = playerMonster.currentHp - prevHp

  addLog(`💚 ${playerMonster.nameMonster} utilise ${skillHeal.nameSkills} et récupère ${actualHeal} PV.`, 'heal')

  enemyTurn()
  tickSkills()
  currentRound.value++
}

// 🛡️ Défense
const executeDefense = () => {
  if (isGameOver.value) return
  if (!skillShield.canUse()) return

  skillShield.use()
  isDefending.value = true
  playerShield.value += skillShield.amount
  addLog(`🛡️ ${playerMonster.nameMonster} active sa garde (+${skillShield.amount} Bouclier) !`, 'defense')

  enemyTurn()
  tickSkills()
  currentRound.value++
}

// 🎲 Luck or Not (Tirage 0 à 10 - Compétence skillLuck)
const executeLuck = () => {
  if (isGameOver.value) return
  if (!skillLuck.canUse()) return

  skillLuck.use()
  const roll = Math.floor(Math.random() * 11)

  if (roll === 0) {
    playerMonster.currentHp = Math.max(0, playerMonster.currentHp - 10)
    addLog(`🎲 Luck or Not (Tirage : 0) -> Malchance ! Le joueur perd 10 PV !`, 'luck')
  } else if (roll >= 1 && roll <= 5) {
    const shieldGain = roll * 10
    playerShield.value += shieldGain
    addLog(`🎲 Luck or Not (Tirage : ${roll}) -> +${shieldGain} Bouclier gagné !`, 'luck')
  } else if (roll >= 6 && roll <= 10) {
    const value = roll * 10
    const damage = value / 2
    enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
    playerShield.value += damage
    addLog(`🎲 Luck or Not (Tirage : ${roll}) -> ${damage} dégâts infligés & +${damage} Bouclier !`, 'luck')
  }

  if (playerMonster.currentHp <= 0) {
    winner.value = 'enemy'
  } else if (enemyMonster.currentHp <= 0) {
    winner.value = 'player'
  } else {
    enemyTurn()
  }

  tickSkills()
  currentRound.value++
}

// 🏳️ Abandonner
const executeGiveUp = () => {
  if (isGameOver.value) return

  winner.value = 'giveup'
  addLog(`🏳️ Le joueur a abandonné le combat.`, 'give-up')
}

// Recommencer la partie
const restartBattle = () => {
  playerMonster.currentHp = playerMonster.maxHp
  enemyMonster.currentHp = enemyMonster.maxHp
  playerShield.value = 0
  currentRound.value = 1
  isDefending.value = false
  winner.value = null
  skillSpecial.currentCoolDown = 0
  skillHeal.currentCoolDown = 0
  skillShield.currentCoolDown = 0
  skillLuck.currentCoolDown = 0
  skillHeal.currentCharges = skillHeal.maxCharge
  KamehamehaAttack.currentCharges = KamehamehaAttack.maxCharge
  KamehamehaAttack.currentCoolDown = 0
  cheatActive.value = false
  code.value = ''
  logs.value = []
  addLog(`⚔️ Combat réinitialisé. Bonne chance !`, 'system')
}
// commentaire
const newComment = ref('')
const comments = ref<string[]>([])
const lastKey = ref('')
const code = ref('')
const konamiCode = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a'

function addComment(){
  const text = newComment.value.trim()
  if(!text) return 
  comments.value.push(text)
  newComment.value =''
  code.value =''
}

// shuuut c'est secret

const cheatActive = ref(false)

function onKey(e:KeyboardEvent){
  if (e.key.startsWith('Arrow')) e.preventDefault()
  lastKey.value = e.key
  code.value = (code.value + ' ' + e.key).trimStart().slice(-konamiCode.length)
}
const KamehamehaAttack = reactive(new Skill(skills.kamehameha))
const executeKamehameha = () => {
  if (isGameOver.value) return
  if (!KamehamehaAttack.canUse()) return

  KamehamehaAttack.use()
  const damage = KamehamehaAttack.amount
  enemyMonster.currentHp = Math.max(0, enemyMonster.currentHp - damage)
  addLog(`⚔️ ${playerMonster.nameMonster} utilise ${KamehamehaAttack.nameSkills} et inflige ${damage} dégâts.`, 'attack')

  if (enemyMonster.currentHp > 0) {
    enemyTurn()
  } else {
    winner.value = 'player'
    addLog(`🏆 Victoire ! ${enemyMonster.nameMonster} est K.O. !`, 'system')
  }

  tickSkills()
  currentRound.value++
}

const VIDEO_ID = 'k-_kW0G5iSY'
const VIDEO_DURATION_MS = 12000     // durée de la vidéo en millisecondes
const showCheatVideo = ref(false)
let cheatTimer: ReturnType<typeof setTimeout> | null = null

function endCheatVideo() {
  showCheatVideo.value = false
  if (cheatTimer) clearTimeout(cheatTimer)
  cheatTimer = null
  executeKamehameha()
}

watch(code, (newVal) => {
  if (newVal === konamiCode) {
    cheatActive.value = true
    showCheatVideo.value = true
    cheatTimer = setTimeout(endCheatVideo, VIDEO_DURATION_MS)
    code.value = ''
  }
})

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', monospace, sans-serif;
}
</style>
