<template>
  <div class="bg-slate-950 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.05)] border border-slate-800 w-full max-w-xl">
    <div class="flex flex-col space-y-4 font-mono text-2xl font-bold text-slate-300 items-center">
      <div v-for="(step, idx) in visibleStepsList" :key="idx" 
           class="w-full flex justify-between items-center p-5 bg-slate-900 border border-slate-800 rounded-xl animate-in slide-in-from-left duration-500">
        <span class="text-xs text-slate-500 font-sans tracking-widest uppercase">{{ step.description }}</span>
        <span class="text-cyan-400 text-3xl">{{ step.formula }}</span>
      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-8 pt-4 border-t border-slate-800 flex justify-center gap-4 text-xs font-sans uppercase tracking-widest font-bold">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-cyan-400 rounded-sm"></div> <span class="text-slate-500">Passo a Passo da Equação</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { RuleOfThreeEngine } from '../../core/domain/services/RuleOfThreeEngine';

const props = defineProps<{ a: number; b: number; c: number }>();
const emit = defineEmits(['finished']);
const visibleSteps = ref(0);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const data = computed(() => RuleOfThreeEngine.calculate(props.a, props.b, props.c));
const visibleStepsList = computed(() => data.value.steps.slice(0, visibleSteps.value));

onMounted(() => {
  animationTimer = setInterval(() => {
    if (visibleSteps.value < data.value.totalSteps) visibleSteps.value++;
    else { if (animationTimer) clearInterval(animationTimer); emit('finished'); }
  }, 1000);
});
onUnmounted(() => { if (animationTimer) clearInterval(animationTimer); });
</script>