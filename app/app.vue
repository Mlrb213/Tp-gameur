<template>
  <div class="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6 font-pixel">
    <div class="w-full max-w-2xl flex flex-col gap-4">
      <!-- 1. Composant des Boutons 8bitcn (Travail de Mohamed) -->
      <BattleControls
        :current-round="currentRound"
        :is-game-over="false"
        :player-hp="100"
        :player-max-hp="100"
        :is-defending="false"
        @attack="onAction('Attaque lancée !', 'attack')"
        @attack-spe="onAction('Attaque Spéciale déchaînée !', 'attack-spe')"
        @heal="onAction('Soin utilisé !', 'heal')"
        @defense="onAction('Posture défensive activée !', 'defense')"
        @luck="onAction('Tirage Luck or Not effectué !', 'luck')"
        @give-up="onAction('Combat abandonné.', 'give-up')"
      />

      <!-- 2. Composant Journal de Combat (Battle Log) -->
      <BattleLog
        :logs="logs"
        @clear="logs = []"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BattleControls from '~/components/BattleControls.vue'
import BattleLog, { type LogItem } from '~/components/BattleLog.vue'

const currentRound = ref(1)
const logs = ref<LogItem[]>([])
let logIdCounter = 0

const onAction = (text: string, type: LogItem['type']) => {
  logs.value.unshift({
    id: ++logIdCounter,
    text,
    type,
    round: currentRound.value
  })

  currentRound.value++
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', monospace, sans-serif;
}
</style>
