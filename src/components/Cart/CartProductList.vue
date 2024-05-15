<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import CartProduct from './CartProduct.vue'

const props = defineProps<{
  carts: ProductCartInterface[]
}>()
const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void
}>()
</script>

<template>
  <div class="d-flex flex-column">
    <CartProduct
      v-for="cart of props.carts"
      :cart="cart"
      :key="cart.id"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
