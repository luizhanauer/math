<template>
  <div class="math-cell" :class="{ 'is-operator': isOperator }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isOperator?: boolean }>();


</script>

<style scoped>
.math-cell {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  border: 1px solid #e0e0e0; /* O efeito de papel quadriculado */
  background-color: white;
}

.is-operator {
  color: #d32f2f;
  border: none;
}
</style>