<template>
  <div class="bg-slate-950 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.05)] border border-slate-800 transition-all duration-700 w-full max-w-md">
    <div class="flex flex-col items-end space-y-1 font-mono text-4xl font-bold text-slate-200">
      <div v-if="visibleSteps >= 1" class="flex text-cyan-400 animate-in fade-in duration-500">
        <span v-for="(d, i) in data.factorA" :key="'a'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>

      <div v-if="visibleSteps >= 2" class="flex border-b-4 border-slate-700 pb-2 text-purple-400 animate-in fade-in duration-500">
        <span class="w-12 h-14 flex items-center justify-center mr-4 text-slate-600">×</span>
        <span v-for="(d, i) in data.factorB" :key="'b'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>

      <div v-for="(partial, idx) in visiblePartials" :key="'p'+idx" 
           class="flex text-slate-400 animate-in slide-in-from-right-4 duration-500"
           :style="{ marginRight: `${partial.indentation * 3}rem` }">
        <span v-for="(d, i) in partial.digits" :key="'pd'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>

      <div v-if="visibleSteps >= data.totalSteps" class="flex border-t-4 border-slate-700 pt-2 text-emerald-400 animate-in zoom-in duration-700">
        <span v-for="(d, i) in data.total" :key="'t'+i" class="w-12 h-14 flex items-center justify-center">{{ d }}</span>
      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-8 pt-4 border-t border-slate-800 flex flex-wrap justify-center gap-4 text-xs font-sans uppercase tracking-widest font-bold">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-cyan-400 rounded-sm"></div> <span class="text-slate-500">Multiplicando</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-purple-400 rounded-sm"></div> <span class="text-slate-500">Multiplicador</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-slate-400 rounded-sm"></div> <span class="text-slate-500">Produtos Parciais</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-emerald-400 rounded-sm"></div> <span class="text-slate-500">Produto Total</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { MultiplicationEngine } from '../../core/domain/services/MultiplicationEngine';

const props = defineProps<{ a: number; b: number }>();
const emit = defineEmits(['finished']);
const visibleSteps = ref(0);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const data = computed(() => MultiplicationEngine.calculate(props.a, props.b));
const visiblePartials = computed(() => {
  const partialCount = visibleSteps.value - 2;
  return partialCount > 0 ? data.value.partials.slice(0, partialCount) : [];
});

onMounted(() => {
  animationTimer = setInterval(() => {
    if (visibleSteps.value < data.value.totalSteps) visibleSteps.value++;
    else { if (animationTimer) clearInterval(animationTimer); emit('finished'); }
  }, 600);
});
onUnmounted(() => { if (animationTimer) clearInterval(animationTimer); });
</script>