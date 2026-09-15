<template>
    <div class="card bg-base-100 w-auto p-5 shadow-sm">
        <figure class="pt-10 flex flex-col relative">
            <button v-for="monster in props.team" class="btn btn-outline absolute left-0 top-10 z-10 h-11 py-1 rounded-[5px] overflow-hidden flex flex-col gap-0"  @click="switchMonster(monster)" v-if="props.type !== 'enemie'">
                <div class="flex items-center gap-1 h-full">
                    <img :src="props.spriteFront" alt="" class="h-7 w-auto shrink-0"/>
                    <p>{{ props.nameMonster }}</p>
                </div>
                <progress class="progress progress-success" :class="bareColor" :value="props.currentHp" :max="props.maxHp"></progress>
            </button>
            <img style="height: 280px;"
            :src="imgFront"
            :alt="activeMonster?.nameMonster"
            class="rounded-xl"/>
            <span>{{activeMonster?.nameMonster}}</span>
        </figure>
        <progress class="progress w-auto" :class="bareColorActiveMonster" :value="activeMonster?.currentHp" :max="activeMonster?.maxHp"></progress>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'

interface Monster {
    idMonster: string,
    nameMonster: string,
    spriteFront: string,
    spriteBack: string,
    currentHp: number,
    maxHp: number,
    type: string,
}

const props = defineProps<{
    team: Monster[],
    type: string,
    activeId?: string,
}>();

const emit = defineEmits<{
    (e: 'update:activeId', id: string): void
}>();

// Monstre actif : celui passé en v-model, sinon le premier vivant de l'équipe
const activeMonster = computed<Monster | undefined>(() => {
    if (props.activeId) {
        const found = props.team.find(m => m.idMonster === props.activeId);
        if (found) return found;
    }
    return props.team.find(m => m.currentHp > 0) ?? props.team[0];
});

function switchMonster(monster: Monster) {
    if (monster.currentHp <= 0) return;
    emit('update:activeId', monster.idMonster);
}

const imgFront = computed(() => {
    if (!activeMonster.value) return '';
    if (activeMonster.value.currentHp > 0) {
        return props.type !== 'allier' ? activeMonster.value.spriteFront : activeMonster.value.spriteBack;
    }
    return 'https://png.pngtree.com/png-vector/20260329/ourmid/pngtree-pixel-art-tombstone-with-rip-text-png-image_19017781.webp'
})

function BarColor(monster: Monster) {
    const pourcentage = (monster.currentHp / monster.maxHp) * 100;
    if (pourcentage <= 20) return 'progress-error';
    if (pourcentage <= 50) return 'progress-warning';
    return 'progress-success';
}

const bareColorActiveMonster = computed(() => activeMonster.value ? BarColor(activeMonster.value) : 'progress-success');
</script>

<style scoped lang="css">
</style>