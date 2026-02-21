<template>
  <div class="bg-slate-950 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.05)] border border-slate-800 w-full max-w-3xl">
    <div class="flex flex-col space-y-6 items-center font-mono font-bold text-slate-300">
      
      <div v-for="(step, idx) in visibleStepsList" :key="idx" 
           class="w-full flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800 animate-in slide-in-from-top-4 duration-500">
        
        <span class="text-xs text-slate-500 font-sans tracking-widest uppercase mb-6 text-center">{{ step.description }}</span>
        
        <div class="flex items-center text-4xl gap-6">
          <div class="flex flex-col items-center">
            <span class="text-cyan-400 px-2">{{ step.f1.numerator }}</span>
            <span class="w-full border-t-4 border-slate-700 my-1"></span>
            <span class="text-purple-400 px-2">{{ step.f1.denominator }}</span>
          </div>

          <span class="text-slate-600 text-3xl mx-2">
            {{ formatOperator(step.operator) }}
          </span>

          <div class="flex flex-col items-center">
            <span class="text-cyan-400 px-2">{{ step.f2.numerator }}</span>
            <span class="w-full border-t-4 border-slate-700 my-1"></span>
            <span class="text-purple-400 px-2">{{ step.f2.denominator }}</span>
          </div>

          <template v-if="step.result">
            <span class="text-slate-600 ml-4">=</span>
            <div class="flex flex-col items-center ml-2 animate-in zoom-in duration-500">
              <span class="text-emerald-400 px-2">{{ step.result.numerator }}</span>
              <span class="w-full border-t-4 border-slate-700 my-1"></span>
              <span class="text-emerald-400 px-2">{{ step.result.denominator }}</span>
            </div>
          </template>
        </div>

      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-8 pt-4 border-t border-slate-800 flex justify-center flex-wrap gap-4 text-xs font-sans uppercase tracking-widest font-bold">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-cyan-400 rounded-sm"></div> <span class="text-slate-500">Numeradores</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-purple-400 rounded-sm"></div> <span class="text-slate-500">Denominadores</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-emerald-400 rounded-sm"></div> <span class="text-slate-500">Resultado</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { FractionEngine } from '../../core/domain/services/FractionEngine';
import type { FractionOperator } from '../../core/domain/entities/MathTypes';

const props = defineProps<{ n1: number; d1: number; n2: number; d2: number; op: FractionOperator }>();
const emit = defineEmits(['finished']);
const visibleSteps = ref(0);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const data = computed(() => FractionEngine.calculate(props.n1, props.d1, props.n2, props.d2, props.op));
const visibleStepsList = computed(() => data.value.steps.slice(0, visibleSteps.value));

const formatOperator = (op: string) => {
  if (op === '*') return '×';
  if (op === '/') return '÷';
  return op;
};

onMounted(() => {
  animationTimer = setInterval(() => {
    if (visibleSteps.value < data.value.totalSteps) visibleSteps.value++;
    else { if (animationTimer) clearInterval(animationTimer); emit('finished'); }
  }, 1200); 
});

onUnmounted(() => { if (animationTimer) clearInterval(animationTimer); });
</script>