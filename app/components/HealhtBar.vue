<template>
    <div class="card bg-base-100 w-100 p-5 shadow-sm mx-auto">
        <figure class="pt-10 flex flex-col relative">
            <button class="btn btn-outline absolute left-0 top-10 z-10"  @click="" style="border-radius: 5px;">
                <div class="flex">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="" style="height: 100%;"/>
                    <p>{{  }}Nom</p>
                </div>
                <progress class="progress progress-success w-auto" :class="bareColor" :value="props.currentHp" :max="props.maxHp"></progress>
            </button>
            <img style="height: 280px;"
            :src="currentHp>0 ? props.sprite : 'https://png.pngtree.com/png-vector/20260329/ourmid/pngtree-pixel-art-tombstone-with-rip-text-png-image_19017781.webp'"
            :alt="props.nameMonster"
            class="rounded-xl" />
            <p>{{props.nameMonster}} aaa</p>
        </figure>
        <progress class="progress progress-success w-auto" :class="bareColor" :value="props.currentHp" :max="props.maxHp"></progress>
    </div>
</template>

<script setup lang='ts'>
import {computed} from 'vue'

interface monster{
    idMonster:string,
    nameMonster:string,
    sprite:string,
    currentHp:number,
    maxHp:number,
};

const props = defineProps<{
    idMonster: string,
    nameMonster: string,
    sprite: string,
    currentHp: number,
    maxHp: number,
}>();

const bareColor = computed(() => {
    const pourcentage = (props.currentHp / props.maxHp) * 100;

    if (pourcentage <= 20) {
        return 'progress-error';
    } else if (pourcentage <= 50) {
        return 'progress-warning';
    } else {
        return 'progress-success';
    }
});

</script>

<style scoped lang="css">
</style>