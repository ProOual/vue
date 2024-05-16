<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ProductInterface } from '@/interface'
import ShopProduct from './ShopProduct.vue'

defineProps<{
  products: ProductInterface[]
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void
}>()
</script>

<template>
  <div class="grid p-20">
    <ShopProduct
      v-for="product of products"
      @add-product-to-cart="emit('addProductToCart', $event)"
      :product="product"
      :key="product.id"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 300px;
  gap: 20px;
}
</style>
