<template>
  <div>
    <h1 class="justify-items-center text-7xl">END GAME</h1>
  </div>
  <div class="card card-side bg-base-100 shadow-sm">
    <figure class="w-60 rounded-2xl">
      <img :src="_playerPicture" :alt="_playerName" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">VICTOIRE! {{ _player }}</h2>
      <div class="card-actions justify-center">
        <button class="btn btn-primary">Recommencer</button>
      </div>
    </div>
  </div>
  <div class="card card-side bg-base-100 shadow-sm">
    <figure class="w-60 rounded-2xl">
      <img :src="_monsterPicture" :alt="_monsterName" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">PERDU!! {{ _player }}</h2>
      <h2 v-if="false" class="card-title">ÉGALITÉ!</h2>
      <div class="card-actions justify-center">
        <button class="btn btn-primary">Recommencer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const _title = ref("END GAME");
const _state = ref(["VICTOIRE", "PERDU", "ÉGALITÉ"]);
const _winner = ref(null);
const _loser = ref(null);
const _monsterName = ref("HANGKOK");
const _monsterPicture = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
);

const _playerName = ref("WOLVERINE");
const _playerPicture = ref(
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
);
const _fullLife = ref(100);
const _life = ref(11);
</script>

<style scoped lang="css"></style>
