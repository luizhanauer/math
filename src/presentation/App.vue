<template>
  <main
    class="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 pb-20"
  >
    <header
      class="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 shadow-sm shadow-cyan-900/10"
    >
      <div
        class="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-black text-xl"
          >
            M
          </div>
          <div>
            <h1
              class="text-2xl font-black tracking-tighter text-white uppercase leading-none"
            >
              Math<span class="text-cyan-400">Visual</span>
            </h1>
            <div class="flex gap-2 mt-1">
              <span
                class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"
                >Aritmética</span
              >
              <span class="text-[9px] font-bold text-slate-700">•</span>
              <span
                class="text-[9px] font-bold text-slate-500 uppercase tracking-widest"
                >Passo a Passo</span
              >
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 justify-center"
        >
          <button
            v-for="t in tabs"
            :key="t"
            @click="changeTab(t)"
            :class="[
              'px-4 py-2 text-xs font-bold rounded-lg border transition-all',
              activeTab === t
                ? 'bg-slate-800 text-cyan-400 border-slate-700 shadow-md'
                : 'text-slate-500 border-transparent hover:text-slate-300',
            ]"
          >
            {{ t }}
          </button>
        </div>
      </div>
    </header>

    <div
      class="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <div class="lg:col-span-4 space-y-6">
        <section
          class="bg-slate-900 rounded-[2rem] p-6 border border-slate-800 shadow-xl relative overflow-hidden"
        >
          <div
            class="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          ></div>

          <div class="relative z-10">
            <h3
              class="text-sm font-bold text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-800 pb-4"
            >
              Parâmetros: {{ activeTab }}
            </h3>

            <div class="space-y-4">
              <template v-if="requiresTwoInputs">
                <div>
                  <label
                    class="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2"
                    >{{ labels.first }}</label
                  >
                  <input
                    type="number"
                    v-model.number="form.a"
                    @input="reset"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                  />
                </div>
                <div>
                  <label
                    class="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2"
                    >{{ labels.second }}</label
                  >
                  <input
                    type="number"
                    v-model.number="form.b"
                    @input="reset"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-mono text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                  />
                </div>
              </template>

              <template v-if="activeTab === 'Regra de 3'">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="text-xs font-bold text-slate-500 uppercase block mb-1"
                      >Valor A</label
                    >
                    <input
                      type="number"
                      v-model.number="form.a"
                      @input="reset"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-white outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      class="text-xs font-bold text-slate-500 uppercase block mb-1"
                      >Valor B</label
                    >
                    <input
                      type="number"
                      v-model.number="form.b"
                      @input="reset"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-white outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      class="text-xs font-bold text-slate-500 uppercase block mb-1"
                      >Valor C</label
                    >
                    <input
                      type="number"
                      v-model.number="form.c"
                      @input="reset"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 font-mono text-white outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div>
                    <label
                      class="text-xs font-bold text-slate-500 uppercase block mb-1"
                      >Incógnita</label
                    >
                    <div
                      class="w-full h-[42px] bg-slate-900 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-cyan-600 font-bold font-mono"
                    >
                      X
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="activeTab === 'Fração'">
                <div class="mb-6">
                  <label
                    class="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 text-center"
                    >Operação</label
                  >
                  <div
                    class="flex bg-slate-950 p-1 rounded-xl border border-slate-800 w-full justify-between"
                  >
                    <button
                      v-for="op in ['+', '-', '*', '/']"
                      :key="op"
                      @click="
                        form.fractionOp = op as FractionOperator;
                        reset();
                      "
                      :class="
                        form.fractionOp === op
                          ? 'bg-cyan-600 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'text-slate-500 hover:text-cyan-400 hover:bg-slate-900'
                      "
                      class="flex-1 py-2 text-xl font-black rounded-lg transition-all"
                    >
                      {{ op === "*" ? "×" : op === "/" ? "÷" : op }}
                    </button>
                  </div>
                </div>

                <div
                  class="flex justify-between items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                >
                  <div class="flex flex-col w-full gap-2">
                    <input
                      type="number"
                      v-model.number="form.n1"
                      @input="reset"
                      class="w-full text-center font-mono bg-slate-900 border border-slate-700 text-white rounded-lg p-2 outline-none focus:border-cyan-500"
                      placeholder="Num 1"
                    />
                    <hr class="border-slate-700" />
                    <input
                      type="number"
                      v-model.number="form.d1"
                      @input="reset"
                      class="w-full text-center font-mono bg-slate-900 border border-slate-700 text-white rounded-lg p-2 outline-none focus:border-cyan-500"
                      placeholder="Den 1"
                    />
                  </div>

                  <span class="text-3xl text-cyan-500 font-black">{{
                    form.fractionOp === "*"
                      ? "×"
                      : form.fractionOp === "/"
                        ? "÷"
                        : form.fractionOp
                  }}</span>

                  <div class="flex flex-col w-full gap-2">
                    <input
                      type="number"
                      v-model.number="form.n2"
                      @input="reset"
                      class="w-full text-center font-mono bg-slate-900 border border-slate-700 text-white rounded-lg p-2 outline-none focus:border-cyan-500"
                      placeholder="Num 2"
                    />
                    <hr class="border-slate-700" />
                    <input
                      type="number"
                      v-model.number="form.d2"
                      @input="reset"
                      class="w-full text-center font-mono bg-slate-900 border border-slate-700 text-white rounded-lg p-2 outline-none focus:border-cyan-500"
                      placeholder="Den 2"
                    />
                  </div>
                </div>
              </template>

              <div
                v-if="errorMessage"
                class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-fade-in"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-sm text-red-300 font-medium leading-relaxed">
                  {{ errorMessage }}
                </p>
              </div>

              <button
                @click="start"
                :disabled="isCalculating"
                class="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black py-4 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex justify-center items-center gap-2 uppercase tracking-wide text-sm active:scale-95"
              >
                <span v-if="!isCalculating">Resolver Visualmente</span>
                <span v-else class="animate-pulse">Calculando...</span>
              </button>
            </div>
          </div>
        </section>

        <section
          class="bg-slate-900 rounded-2xl p-5 border border-slate-800 relative overflow-hidden"
        >
          <div class="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-emerald-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 8.56l-1.488.638a1 1 0 000 1.84l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-1.488-.637L10 10.744 3.31 8.56z"
              />
            </svg>
            <h4
              class="text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              Aprenda a Regra
            </h4>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">
            {{ currentDidacticExplanation }}
          </p>
        </section>
      </div>

      <div class="lg:col-span-8">
        <div
          class="bg-slate-900 rounded-[2rem] p-8 border border-slate-800 shadow-xl min-h-[500px] flex items-center justify-center relative overflow-hidden"
        >
          <div
            v-if="hasStarted"
            class="w-full flex justify-center z-10 animate-fade-in"
            :key="renderKey"
          >
            <AdditionGrid
              v-if="activeTab === 'Adição'"
              :a="form.a"
              :b="form.b"
              @finished="onFinished"
            />
            <SubtractionGrid
              v-else-if="activeTab === 'Subtração'"
              :a="form.a"
              :b="form.b"
              @finished="onFinished"
            />
            <MultiplicationGrid
              v-else-if="activeTab === 'Multiplicação'"
              :a="form.a"
              :b="form.b"
              @finished="onFinished"
            />
            <DivisionGrid
              v-else-if="activeTab === 'Divisão'"
              :dividend="form.a"
              :divisor="form.b"
              @finished="onFinished"
            />
            <RuleOfThreeGrid
              v-else-if="activeTab === 'Regra de 3'"
              :a="form.a"
              :b="form.b"
              :c="form.c"
              @finished="onFinished"
            />
            <PowerGrid
              v-else-if="activeTab === 'Potência'"
              :base="form.a"
              :exponent="form.b"
              @finished="onFinished"
            />
            <FractionGrid
              v-else-if="activeTab === 'Fração'"
              :n1="form.n1"
              :d1="form.d1"
              :n2="form.n2"
              :d2="form.d2"
              :op="form.fractionOp"
              @finished="onFinished"
            />
          </div>

          <div
            v-else
            class="text-center w-full z-10 flex flex-col items-center"
          >
            <div
              class="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-slate-700"
            >
              <span class="text-4xl text-slate-600 font-mono">?</span>
            </div>
            <p class="text-slate-500 text-lg font-medium">
              Configure os parâmetros e inicie a operação.
            </p>
            <p class="text-slate-600 text-sm mt-2">
              A resolução visual passo a passo aparecerá aqui.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import AdditionGrid from "./components/AdditionGrid.vue";
import SubtractionGrid from "./components/SubtractionGrid.vue";
import MultiplicationGrid from "./components/MultiplicationGrid.vue";
import DivisionGrid from "./components/DivisionGrid.vue";
import RuleOfThreeGrid from "./components/RuleOfThreeGrid.vue";
import PowerGrid from "./components/PowerGrid.vue";
import FractionGrid from "./components/FractionGrid.vue";
import type { FractionOperator } from "../core/domain/entities/MathTypes";

const tabs = [
  "Adição",
  "Subtração",
  "Multiplicação",
  "Divisão",
  "Fração",
  "Regra de 3",
  "Potência",
];
const activeTab = ref("Adição");

const form = reactive({
  a: 150,
  b: 25,
  c: 10,
  n1: 1,
  d1: 2,
  n2: 1,
  d2: 3,
  fractionOp: "+" as FractionOperator,
});

const isCalculating = ref(false);
const hasStarted = ref(false);
const renderKey = ref(0);
const errorMessage = ref("");

const requiresTwoInputs = computed(() => {
  return [
    "Adição",
    "Subtração",
    "Multiplicação",
    "Divisão",
    "Potência",
  ].includes(activeTab.value);
});

const labels = computed(() => {
  if (activeTab.value === "Divisão")
    return { first: "Dividendo", second: "Divisor" };
  if (activeTab.value === "Potência")
    return { first: "Base", second: "Expoente" };
  if (activeTab.value === "Subtração")
    return { first: "Minuendo", second: "Subtraendo" };
  return {
    first: "Primeira Parcela / Fator",
    second: "Segunda Parcela / Fator",
  };
});

const currentDidacticExplanation = computed(() => {
  switch (activeTab.value) {
    case "Adição":
      return "Alinhe os números pela direita. Some coluna por coluna. Se o resultado de uma coluna for 10 ou maior, anote a unidade e 'suba' a dezena para a próxima coluna à esquerda.";
    case "Subtração":
      return "Subtraia a coluna da direita para a esquerda. Se o número de cima for menor que o de baixo, 'empreste' 1 da casa vizinha à esquerda (somando 10 ao valor atual).";
    case "Multiplicação":
      return "Multiplique cada dígito do multiplicador (baixo) por todo o multiplicando (cima). A cada nova linha, desloque o resultado uma casa para a esquerda. Por fim, some as parcelas parciais.";
    case "Divisão":
      let textDiv =
        "Analise da esquerda para a direita quantas vezes o divisor cabe no dividendo. Multiplique, coloque o resultado sob o dividendo, faça a subtração para achar o resto, e desça o próximo dígito.";
      if (form.a < 0 || form.b < 0)
        textDiv +=
          " Como usamos números negativos, a divisão é feita ignorando os sinais e, no fim, aplicamos a Regra dos Sinais (+ com - dá -).";
      return textDiv;
    case "Regra de 3":
      return "Monte a proporção alinhando as grandezas conhecidas. Multiplique cruzado (os valores diagonais) e divida pelo número que sobrou para encontrar o valor de X.";
    case "Potência":
      return "A base (número principal) deve ser multiplicada por ela mesma a quantidade de vezes indicada pelo expoente. Ex: 2³ = 2 × 2 × 2 = 8.";
    case "Fração":
      if (form.fractionOp === "+" || form.fractionOp === "-") {
        return "Para somar/subtrair, encontre o MMC dos denominadores. Divida o MMC pelo denominador antigo e multiplique pelo numerador. Resolva a parte de cima e mantenha o MMC embaixo.";
      } else if (form.fractionOp === "*") {
        return "Na multiplicação de frações, o processo é direto: multiplique numerador com numerador (cima com cima) e denominador com denominador (baixo com baixo).";
      } else {
        return "Na divisão de frações, mantenha a primeira fração intacta, inverta a segunda (o numerador vira denominador e vice-versa) e então multiplique ambas as frações.";
      }
    default:
      return "Selecione uma operação matemática para ver o seu passo a passo detalhado.";
  }
});

const validateInputs = (): boolean => {
  if (activeTab.value === "Divisão" && form.b === 0) {
    errorMessage.value =
      "Na matemática, é impossível dividir por zero! Tente usar um divisor maior ou menor que zero.";
    return false;
  }
  if (activeTab.value === "Fração" && (form.d1 === 0 || form.d2 === 0)) {
    errorMessage.value =
      "O denominador (parte de baixo) de uma fração não pode ser zero!";
    return false;
  }
  if (
    activeTab.value === "Fração" &&
    form.fractionOp === "/" &&
    form.n2 === 0
  ) {
    errorMessage.value =
      "Para dividir frações, a segunda não pode ter o numerador zero, pois ao inverter a operação ele se tornará um divisor igual a zero.";
    return false;
  }
  if (activeTab.value === "Regra de 3" && form.a === 0) {
    errorMessage.value =
      "O Valor A da proporção não pode ser zero, pois ele atuará como divisor no final da equação.";
    return false;
  }
  return true;
};

const start = () => {
  errorMessage.value = "";
  if (!validateInputs()) return;

  if (hasStarted.value) renderKey.value++;
  hasStarted.value = true;
  isCalculating.value = true;
};

const reset = () => {
  hasStarted.value = false;
  isCalculating.value = false;
  errorMessage.value = "";
};

const changeTab = (t: string) => {
  activeTab.value = t;
  reset();
};

const onFinished = () => {
  isCalculating.value = false;
};
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
