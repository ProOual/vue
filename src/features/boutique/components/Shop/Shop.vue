<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { FiltersInterface, FilterUpdate, ProductInterface } from '@/interface'
import ShopProductList from './ShopProductList.vue'
import ShopFilters from './ShopFilters.vue'
defineProps<{
  products: ProductInterface[]
  filters: FiltersInterface
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void
  (e: 'updateFilter', filter: FilterUpdate): void
}>()
</script>

<template>
  <div class="d-flex flex-row">
    <ShopFilters
      :filters="filters"
      @update-filter="emit('updateFilter', $event)"
      class="shop-filter"
    />
    <ShopProductList
      @add-product-to-cart="emit('addProductToCart', $event)"
      :products="products"
      class="flex-fill scrollable"
    />
  </div>
</template>

<style lang="scss" scoped>
.shop-filter {
  flex: 0 0 200px;
}
.scrollable {
  overflow-y: auto;
  height: calc(100vh - 96px);
}
</style>
