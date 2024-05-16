<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ProductCartInterface } from '@/interface'
import CartProduct from './CartProduct.vue'

const props = defineProps<{
  carts: ProductCartInterface[]
}>()
const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void
}>()
</script>

<template>
  <div class="d-flex flex-column">
    <CartProduct
      v-for="cart of props.carts"
      :cart="cart"
      :key="cart._id"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
