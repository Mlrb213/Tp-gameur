<template>
    <div class="card bg-base-100 w-auto p-5 shadow-sm">
        <figure class="pt-10 flex flex-col relative">
            <button class="btn btn-outline absolute left-0 top-10 z-10 h-10 py-0 rounded-[5px] overflow-hidden"  @click="">
                <div class="flex items-center gap-1 h-full">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="" class="h-7 w-auto shrink-0"/>
                    <p>{{ props.nameMonster }}</p>
                </div>
                <progress class="progress progress-success w-auto" :class="bareColor" :value="props.currentHp" :max="props.maxHp"></progress>
            </button>
            <img style="height: 280px;"
            :src="currentHp>0 ? props.sprite : 'https://png.pngtree.com/png-vector/20260329/ourmid/pngtree-pixel-art-tombstone-with-rip-text-png-image_19017781.webp'"
            :alt="props.nameMonster"
            class="rounded-xl" />
            <span>{{props.nameMonster}}</span>
        </figure>
        <progress class="progress w-auto" :class="bareColor" :value="props.currentHp" :max="props.maxHp"></progress>
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