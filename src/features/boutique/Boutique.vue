<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
//import data from '../../data/product'
import { computed, reactive } from 'vue'
import type {
  FiltersInterface,
  ProductCartInterface,
  ProductInterface,
  FilterUpdate
} from '../../interface'
import { DEFAULT_FILTERS } from './data/filters'

const state = reactive<{
  products: ProductInterface[]
  cart: ProductCartInterface[]
  filters: FiltersInterface
}>({
  products: [],
  cart: [],
  filters: { ...DEFAULT_FILTERS }
})

const products = await (await fetch('https://restapi.fr/api/projetproducts')).json()
if (Array.isArray(products)) {
  state.products = products
  console.log('ll', state.products)
} else {
  state.products = [products]
}

function addProductToCart(productId: string): void {
  const product = state.products.find((product) => product._id === productId)
  if (product) {
    const productInCart = state.cart.find((product) => product._id === productId)
    if (productInCart) {
      productInCart.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  }
}

function removeProductFromCart(productId: string): void {
  const productFromCart = state.cart.find((product) => product._id === productId)
  if (productFromCart?.quantity === 1) {
    state.cart = state.cart.filter((product) => product._id !== productId)
  } else {
    productFromCart!.quantity--
  }
}

function updateFilter(filterUpdate: FilterUpdate) {
  if (filterUpdate.search !== undefined) {
    state.filters.search = filterUpdate.search
  } else if (filterUpdate.priceRange) {
    state.filters.priceRange = filterUpdate.priceRange
  } else if (filterUpdate.category) {
    state.filters.category = filterUpdate.category
  } else {
    state.filters = { ...DEFAULT_FILTERS }
  }
}

const cartEmpty = computed(() => state.cart.length === 0)

const filteredProducts = computed(() => {
  return state.products.filter((product) => {
    console.log('true', product._id)
    console.log(
      '1',
      product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase())
    )
    console.log('2', product.prix >= state.filters.priceRange[0])
    console.log('3', product.prix <= state.filters.priceRange[1])
    console.log(
      '4',
      product.category === state.filters.category || state.filters.category === 'all'
    )
    if (
      product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.prix >= state.filters.priceRange[0] &&
      product.prix <= state.filters.priceRange[1] &&
      (product.category === state.filters.category || state.filters.category === 'all')
    ) {
      return true
    } else {
      console.log('false', product._id)

      return false
    }
  })
})
</script>

<template>
  <div class="boutique-container" :class="{ 'grid-empty': cartEmpty }">
    <Shop
      @update-filter="updateFilter"
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
      class="shop"
    />
    <Cart
      v-if="!cartEmpty"
      :carts="state.cart"
      class="cart"
      @remove-product-from-cart="removeProductFromCart"
    />
  </div>
</template>

<style lang="scss">
.boutique-container {
  display: grid;
  grid-template-columns: 75% 25%;
}
.grid-empty {
  grid-template-columns: 100%;
}
.cart {
  background-color: white;
  border-left: var(--border);
}
</style>
