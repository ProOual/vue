<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ProductCartInterface } from '@/interface'

defineProps<{
  cart: ProductCartInterface
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void
}>()
</script>

<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="mr-10">{{ cart.title }}</strong>
    <span class="flex-fill mr-10">x {{ cart.quantity }}</span>
    <span class="mr-10">Prix : {{ cart.prix }}€</span>
    <button class="btn btn-danger" @click="emit('removeProductFromCart', cart.id)">
      Supprimer
    </button>
  </div>
</template>

<style lang="scss" scoped>
.product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--gray-1);
}
</style>
