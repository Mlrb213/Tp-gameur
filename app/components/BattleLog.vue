<template>
  <div class="w-full max-w-2xl mx-auto mt-6 p-4 bg-white/90 rounded-xl border border-stone-200 shadow-sm font-pixel">
    <!-- En-tête du Battle Log -->
    <div class="flex items-center justify-between mb-3 pb-2 border-b border-stone-200">
      <div class="flex items-center gap-2">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-700">📜 BATTLE LOG</span>
        <span class="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] rounded border border-stone-300 font-bold">
          {{ logs.length }} action(s)
        </span>
      </div>
      <button
        v-if="logs.length > 0"
        type="button"
        class="text-[9px] text-stone-400 hover:text-red-500 uppercase font-bold cursor-pointer"
        @click="$emit('clear')"
      >
        Effacer
      </button>
    </div>

    <!-- Liste des entrées du journal -->
    <div class="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1 font-pixel text-[10px]">
      <div
        v-for="log in logs"
        :key="log.id"
        class="group relative flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200 rounded transition-all"
        :class="logBorderClass(log.type)"
      >
        <div class="flex items-center gap-2">
          <span class="text-xs">{{ logIcon(log.type) }}</span>
          <span class="font-bold text-stone-800">{{ log.text }}</span>
        </div>
        <span class="text-[9px] text-stone-400 font-mono">R{{ log.round }}</span>
      </div>

      <div v-if="logs.length === 0" class="text-center py-6 text-stone-400 text-[10px] italic">
        Aucune action enregistrée. Cliquez sur un bouton pour démarrer le combat !
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface LogItem {
  id: number
  text: string
  type: 'attack' | 'attack-spe' | 'heal' | 'defense' | 'give-up' | 'luck' | 'system'
  round: number
}

defineProps<{
  logs: LogItem[]
}>()

defineEmits(['clear'])

const logIcon = (type: LogItem['type']) => {
  switch (type) {
    case 'attack': return '⚔️'
    case 'attack-spe': return '⚡'
    case 'heal': return '💚'
    case 'defense': return '🛡️'
    case 'luck': return '🎲'
    case 'give-up': return '🏳️'
    default: return '🎮'
  }
}

const logBorderClass = (type: LogItem['type']) => {
  switch (type) {
    case 'attack': return 'border-l-4 border-l-red-500 bg-red-50/50'
    case 'attack-spe': return 'border-l-4 border-l-amber-500 bg-amber-50/50'
    case 'heal': return 'border-l-4 border-l-emerald-500 bg-emerald-50/50'
    case 'defense': return 'border-l-4 border-l-sky-500 bg-sky-50/50'
    case 'luck': return 'border-l-4 border-l-purple-500 bg-purple-50/50'
    case 'give-up': return 'border-l-4 border-l-stone-500 bg-stone-100'
    default: return 'border-l-4 border-l-stone-300'
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', monospace, sans-serif;
}
</style>
