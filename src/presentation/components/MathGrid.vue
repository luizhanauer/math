<template>
  <div class="bg-white p-10 rounded-2xl shadow-xl border border-blue-50 transition-all duration-700">
    <div class="flex flex-col items-end space-y-1 font-mono text-4xl font-bold text-slate-800">
      
      <div v-if="visibleSteps >= 1" class="flex animate-in fade-in slide-in-from-top-4 duration-500 text-blue-600">
        <span v-for="(d, i) in data.factorA" :key="'a'+i" class="w-12 h-14 flex items-center justify-center">
          {{ d }}
        </span>
      </div>

      <div v-if="visibleSteps >= 2" class="flex border-b-4 border-slate-900 pb-2 animate-in fade-in slide-in-from-top-4 duration-500 text-indigo-500">
        <span class="w-12 h-14 flex items-center justify-center mr-4">×</span>
        <span v-for="(d, i) in data.factorB" :key="'b'+i" class="w-12 h-14 flex items-center justify-center">
          {{ d }}
        </span>
      </div>

      <div 
        v-for="(partial, idx) in visiblePartials" 
        :key="'p'+idx" 
        class="flex text-slate-400 animate-in fade-in slide-in-from-right-4 duration-500"
        :style="{ marginRight: `${partial.indentation * 3}rem` }"
      >
        <span v-for="(d, i) in partial.digits" :key="'pd'+i" class="w-12 h-14 flex items-center justify-center">
          {{ d }}
        </span>
      </div>

      <div v-if="visibleSteps >= data.totalSteps" class="flex border-t-4 border-slate-900 pt-2 text-emerald-600 animate-in zoom-in duration-700">
        <span v-for="(d, i) in data.total" :key="'t'+i" class="w-12 h-14 flex items-center justify-center">
          {{ d }}
        </span>
      </div>
    </div>

    <div v-if="visibleSteps >= data.totalSteps" class="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-sm font-sans">
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-blue-600 rounded"></div> <span class="text-slate-500">Multiplicando</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-indigo-500 rounded"></div> <span class="text-slate-500">Multiplicador</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-slate-400 rounded"></div> <span class="text-slate-500">Produtos Parciais</span></div>
      <div class="flex items-center gap-2"><div class="w-3 h-3 bg-emerald-600 rounded"></div> <span class="text-slate-500">Produto Total</span></div>
    </div>
  </div>
</template>

<script>

</script>