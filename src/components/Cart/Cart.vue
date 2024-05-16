<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ProductCartInterface } from '@/interface'
import CartProductList from './CartProductList.vue'
import { computed } from 'vue'

const props = defineProps<{
  carts: ProductCartInterface[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void
}>()

const totalPrice = computed(() =>
  props.carts.reduce((acc, product) => acc + product.prix * product.quantity, 0)
)
</script>

<template>
  <div class="p-20">
    <h2 class="mb-10">Panier</h2>
    <CartProductList
      :carts="props.carts"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
    <button class="btn btn-success">Commander ({{ totalPrice }}€)</button>
  </div>
</template>

<style lang="scss" scoped></style>
