<template>
  <div class="bg-slate-950 p-10 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.05)] border border-slate-800 min-w-[450px]">
    <div class="font-mono text-4xl font-bold text-slate-200">
      <div class="flex items-start mb-4">
        <div class="flex tracking-[0.5rem] pr-6 pt-2 text-cyan-400">
          <span v-for="(d, i) in data.dividend" :key="i">{{ d }}</span>
        </div>
        <div class="flex flex-col">
          <div class="border-l-4 border-b-4 border-slate-700 px-6 py-2 text-purple-400">{{ data.divisor }}</div>
          <div class="px-6 py-2 text-emerald-400 animate-in fade-in duration-1000">
            <span v-if="visibleSteps >= data.totalSteps">{{ data.quotient.join('') }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <div v-for="(step, idx) in visibleStepsList" :key="idx" :style="{ paddingLeft: `${idx * 1.5}rem` }" class="animate-in slide-in-from-left duration-500">
          <div class="text-red-400 flex items-center opacity-80">
            <span class="text-xl mr-2">-</span><span>{{ step.subtractor }}</span>
          </div>
          <div class="border-t-2 border-slate-800 w-fit min-w-[3rem]">
            <span :class="[idx === data.steps.length - 1 && visibleSteps >= data.totalSteps ? 'text-orange-400 font-black' : 'text-slate-500']">
              {{ step.remainder }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-8 pt-4 border-t border-slate-800 flex flex-wrap justify-center gap-4 text-xs font-sans uppercase tracking-widest font-bold">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-cyan-400 rounded-sm"></div> <span class="text-slate-500">Dividendo</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-purple-400 rounded-sm"></div> <span class="text-slate-500">Divisor</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-emerald-400 rounded-sm"></div> <span class="text-slate-500">Quociente</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-red-400 rounded-sm"></div> <span class="text-slate-500">Subtrações</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-orange-400 rounded-sm"></div> <span class="text-slate-500">Resto</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { DivisionEngine } from '../../core/domain/services/DivisionEngine';

const props = defineProps<{ dividend: number; divisor: number }>();
const emit = defineEmits(['finished']);
const visibleSteps = ref(0);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const data = computed(() => DivisionEngine.calculate(props.dividend, props.divisor));
const visibleStepsList = computed(() => data.value.steps.slice(0, visibleSteps.value));

onMounted(() => {
  animationTimer = setInterval(() => {
    if (visibleSteps.value < data.value.totalSteps) visibleSteps.value++;
    else { if (animationTimer) clearInterval(animationTimer); emit('finished'); }
  }, 800);
});
onUnmounted(() => { if (animationTimer) clearInterval(animationTimer); });
</script>