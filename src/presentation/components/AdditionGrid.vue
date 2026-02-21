<template>
  <div class="bg-slate-950 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.05)] border border-slate-800 transition-all duration-700 w-full max-w-md">
    <div class="flex flex-col items-end space-y-1 font-mono text-4xl font-bold text-slate-200">
      
      <div class="flex h-8 mb-2 text-amber-400 text-xl font-bold">
        <span v-for="(carry, i) in carryOverArray" :key="'c'+i" class="w-12 flex items-center justify-center">
          <span v-if="carry > 0" class="animate-bounce">{{ carry }}</span>
        </span>
      </div>

      <div v-if="visibleSteps >= 1" class="flex text-cyan-400 animate-in fade-in duration-500">
        <span v-for="(d, i) in data.factorA" :key="'a'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>

      <div v-if="visibleSteps >= 2" class="flex border-b-4 border-slate-700 pb-2 text-purple-400 animate-in fade-in duration-500">
        <span class="w-12 h-14 flex items-center justify-center mr-4 text-slate-600">+</span>
        <span v-for="(d, i) in data.factorB" :key="'b'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>

      <div v-if="visibleSteps >= data.totalSteps" class="flex pt-2 text-emerald-400 animate-in zoom-in duration-700">
        <span v-for="(d, i) in data.result" :key="'r'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-8 pt-4 border-t border-slate-800 flex flex-wrap justify-center gap-4 text-xs font-sans uppercase tracking-widest font-bold">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-amber-400 rounded-sm"></div> <span class="text-slate-500">Sobe / Vai um</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-cyan-400 rounded-sm"></div> <span class="text-slate-500">Parcela 1</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-purple-400 rounded-sm"></div> <span class="text-slate-500">Parcela 2</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-emerald-400 rounded-sm"></div> <span class="text-slate-500">Soma Total</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { AdditionEngine } from '../../core/domain/services/AdditionEngine';

const props = defineProps<{ a: number; b: number }>();
const emit = defineEmits(['finished']);
const visibleSteps = ref(0);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const data = computed(() => AdditionEngine.calculate(props.a, props.b));

const carryOverArray = computed(() => {
  if (visibleSteps.value < 2) return [];
  const carries = Array(Math.max(data.value.factorA.length, data.value.factorB.length)).fill(0);
  data.value.steps.forEach(step => {
    if (step.carryOut > 0 && step.position >= 0) carries[step.position] = step.carryOut;
  });
  return carries;
});

onMounted(() => {
  animationTimer = setInterval(() => {
    if (visibleSteps.value < data.value.totalSteps) visibleSteps.value++;
    else { if (animationTimer) clearInterval(animationTimer); emit('finished'); }
  }, 600);
});

onUnmounted(() => { if (animationTimer) clearInterval(animationTimer); });
</script>