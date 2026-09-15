<template>
  <div class="w-full max-w-2xl mx-auto p-4 bg-white/80 rounded-xl border border-stone-200 shadow-sm font-pixel">
    <!-- En-tête épuré -->
    <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
      <div class="flex items-center gap-2">
        <span class="text-[11px] font-bold uppercase tracking-wider text-stone-700">COMBAT</span>
        <span class="px-2 py-0.5 bg-stone-900 text-white text-[10px] rounded font-bold">
          ROUND {{ currentRound }}
        </span>
      </div>

      <div v-if="canUseSpecial" class="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-bold animate-pulse">
        ⚡ ATK SPÉ PRÊTE
      </div>
      <div v-else class="text-[10px] text-stone-400 font-bold">
        ATK SPÉ : <span class="text-amber-600 font-bold">{{ roundsUntilSpecial }}</span> TOUR(S)
      </div>
    </div>

    <!-- Grille des Boutons 8bitcn Épurée & Légère -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
      
      <!-- 1. Attaque Normale -->
      <button
        id="btn-attack"
        type="button"
        class="group relative inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-500 hover:bg-red-600 active:translate-y-0.5 transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="isGameOver"
        @click="$emit('attack')"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <span>⚔️</span>
          <span>Attaque</span>
        </span>
        <!-- Coin Pixel 8bitcn léger -->
        <span aria-hidden="true" class="pointer-events-none contents">
          <span class="absolute -top-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -top-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute top-0 left-0 size-1 bg-black"></span>
          <span class="absolute top-0 right-0 size-1 bg-black"></span>
          <span class="absolute bottom-0 left-0 size-1 bg-black"></span>
          <span class="absolute right-0 bottom-0 size-1 bg-black"></span>
          <span class="absolute top-1 -left-1 h-[calc(100%-8px)] w-1 bg-black"></span>
          <span class="absolute top-1 -right-1 h-[calc(100%-8px)] w-1 bg-black"></span>
        </span>
      </button>

      <!-- 2. Attaque Spéciale -->
      <button
        id="btn-attack-spe"
        type="button"
        class="group relative inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-amber-950 bg-amber-400 hover:bg-amber-300 active:translate-y-0.5 transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!canUseSpecial || isGameOver"
        @click="$emit('attack-spe')"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <span>⚡</span>
          <span>Attaque Spé</span>
        </span>
        <!-- Coin Pixel 8bitcn léger -->
        <span aria-hidden="true" class="pointer-events-none contents">
          <span class="absolute -top-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -top-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute top-0 left-0 size-1 bg-black"></span>
          <span class="absolute top-0 right-0 size-1 bg-black"></span>
          <span class="absolute bottom-0 left-0 size-1 bg-black"></span>
          <span class="absolute right-0 bottom-0 size-1 bg-black"></span>
          <span class="absolute top-1 -left-1 h-[calc(100%-8px)] w-1 bg-black"></span>
          <span class="absolute top-1 -right-1 h-[calc(100%-8px)] w-1 bg-black"></span>
        </span>
      </button>

      <!-- 3. Soin / Health -->
      <button
        id="btn-heal"
        type="button"
        class="group relative inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-500 hover:bg-emerald-600 active:translate-y-0.5 transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="isGameOver || isMaxHp"
        @click="$emit('heal')"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <span>💚</span>
          <span>Soin</span>
        </span>
        <!-- Coin Pixel 8bitcn léger -->
        <span aria-hidden="true" class="pointer-events-none contents">
          <span class="absolute -top-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -top-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute top-0 left-0 size-1 bg-black"></span>
          <span class="absolute top-0 right-0 size-1 bg-black"></span>
          <span class="absolute bottom-0 left-0 size-1 bg-black"></span>
          <span class="absolute right-0 bottom-0 size-1 bg-black"></span>
          <span class="absolute top-1 -left-1 h-[calc(100%-8px)] w-1 bg-black"></span>
          <span class="absolute top-1 -right-1 h-[calc(100%-8px)] w-1 bg-black"></span>
        </span>
      </button>

      <!-- 4. Défense -->
      <button
        id="btn-defense"
        type="button"
        class="group relative inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-sky-500 hover:bg-sky-600 active:translate-y-0.5 transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="isGameOver || isDefending"
        @click="$emit('defense')"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <span>🛡️</span>
          <span>Défense</span>
        </span>
        <!-- Coin Pixel 8bitcn léger -->
        <span aria-hidden="true" class="pointer-events-none contents">
          <span class="absolute -top-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -top-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute top-0 left-0 size-1 bg-black"></span>
          <span class="absolute top-0 right-0 size-1 bg-black"></span>
          <span class="absolute bottom-0 left-0 size-1 bg-black"></span>
          <span class="absolute right-0 bottom-0 size-1 bg-black"></span>
          <span class="absolute top-1 -left-1 h-[calc(100%-8px)] w-1 bg-black"></span>
          <span class="absolute top-1 -right-1 h-[calc(100%-8px)] w-1 bg-black"></span>
        </span>
      </button>

      <!-- 5. Luck or Not (Tirage aléatoire 0-10) -->
      <button
        id="btn-luck"
        type="button"
        class="group relative inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-700 active:translate-y-0.5 transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="isGameOver"
        @click="$emit('luck')"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <span>🎲</span>
          <span>Luck or Not</span>
        </span>
        <!-- Coin Pixel 8bitcn léger -->
        <span aria-hidden="true" class="pointer-events-none contents">
          <span class="absolute -top-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -top-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 left-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute -bottom-1 right-1 h-1 w-1/2 bg-black"></span>
          <span class="absolute top-0 left-0 size-1 bg-black"></span>
          <span class="absolute top-0 right-0 size-1 bg-black"></span>
          <span class="absolute bottom-0 left-0 size-1 bg-black"></span>
          <span class="absolute right-0 bottom-0 size-1 bg-black"></span>
          <span class="absolute top-1 -left-1 h-[calc(100%-8px)] w-1 bg-black"></span>
          <span class="absolute top-1 -right-1 h-[calc(100%-8px)] w-1 bg-black"></span>
        </span>
      </button>

      <!-- 6. Abandonner / Give Up -->
      <button
        id="btn-give-up"
        type="button"
        class="group relative sm:col-span-1 lg:col-span-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 hover:bg-red-50 hover:text-red-600 active:translate-y-0.5 transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="isGameOver"
        @click="$emit('give-up')"
      >
        <span class="relative z-10 flex items-center gap-1.5">
          <span>🏳️</span>
          <span>Abandon</span>
        </span>
        <!-- Coin Pixel 8bitcn léger -->
        <span aria-hidden="true" class="pointer-events-none contents">
          <span class="absolute -top-1 left-1 h-1 w-1/2 bg-stone-400"></span>
          <span class="absolute -top-1 right-1 h-1 w-1/2 bg-stone-400"></span>
          <span class="absolute -bottom-1 left-1 h-1 w-1/2 bg-stone-400"></span>
          <span class="absolute -bottom-1 right-1 h-1 w-1/2 bg-stone-400"></span>
          <span class="absolute top-0 left-0 size-1 bg-stone-400"></span>
          <span class="absolute top-0 right-0 size-1 bg-stone-400"></span>
          <span class="absolute bottom-0 left-0 size-1 bg-stone-400"></span>
          <span class="absolute right-0 bottom-0 size-1 bg-stone-400"></span>
          <span class="absolute top-1 -left-1 h-[calc(100%-8px)] w-1 bg-stone-400"></span>
          <span class="absolute top-1 -right-1 h-[calc(100%-8px)] w-1 bg-stone-400"></span>
        </span>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  currentRound: {
    type: Number,
    required: true,
    default: 1
  },
  isGameOver: {
    type: Boolean,
    default: false
  },
  playerHp: {
    type: Number,
    required: true,
    default: 100
  },
  playerMaxHp: {
    type: Number,
    default: 100
  },
  isDefending: {
    type: Boolean,
    default: false
  }
})

defineEmits(['attack', 'attack-spe', 'heal', 'defense', 'give-up', 'luck'])

const canUseSpecial = computed(() => {
  return props.currentRound > 0 && props.currentRound % 3 === 0
})

const roundsUntilSpecial = computed(() => {
  const remainder = props.currentRound % 3
  return remainder === 0 ? 0 : 3 - remainder
})

const isMaxHp = computed(() => {
  return props.playerHp >= props.playerMaxHp
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.font-pixel {
  font-family: 'Press Start 2P', monospace, sans-serif;
}
</style>
