<template>
  <div class="bg-slate-950 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.05)] border border-slate-800 text-center w-full max-w-xl">
    <div class="font-mono flex items-start justify-center text-slate-200 mb-8 animate-in fade-in">
      <span class="text-6xl font-black text-cyan-400">{{ data.base }}</span>
      <span class="text-3xl text-purple-400 ml-1">{{ data.exponent }}</span>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-4 text-3xl font-mono text-slate-400">
      <template v-for="(step, idx) in visibleStepsList" :key="idx">
        <span class="animate-in zoom-in duration-300">{{ step.currentMultiplier }}</span>
        <span v-if="idx < visibleStepsList.length - 1" class="text-slate-600">×</span>
      </template>
      
      <div v-if="visibleSteps >= data.totalSteps" class="ml-4 flex items-center animate-in slide-in-from-right duration-700">
        <span class="text-slate-600 mr-4">=</span>
        <span class="text-emerald-400 font-black text-5xl">{{ data.steps[data.steps.length - 1]?.accumulatedValue }}</span>
      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-12 pt-4 border-t border-slate-800 flex justify-center flex-wrap gap-4 text-xs font-sans uppercase tracking-widest font-bold">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-cyan-400 rounded-sm"></div> <span class="text-slate-500">Base</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-purple-400 rounded-sm"></div> <span class="text-slate-500">Expoente</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-slate-400 rounded-sm"></div> <span class="text-slate-500">Fatores</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-emerald-400 rounded-sm"></div> <span class="text-slate-500">Potência (Resultado)</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { PowerEngine } from '../../core/domain/services/PowerEngine';

const props = defineProps<{ base: number; exponent: number }>();
const emit = defineEmits(['finished']);
const visibleSteps = ref(0);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const data = computed(() => PowerEngine.calculate(props.base, props.exponent));
const visibleStepsList = computed(() => data.value.steps.slice(0, visibleSteps.value));

onMounted(() => {
  animationTimer = setInterval(() => {
    if (visibleSteps.value < data.value.totalSteps) visibleSteps.value++;
    else { if (animationTimer) clearInterval(animationTimer); emit('finished'); }
  }, 800);
});
onUnmounted(() => { if (animationTimer) clearInterval(animationTimer); });
</script>