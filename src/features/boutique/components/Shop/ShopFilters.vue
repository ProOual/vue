<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable vue/require-v-for-key -->
<script setup lang="ts">
import type { Category, FiltersInterface, FilterUpdate } from '../../../../interface'
defineProps<{
  filters: FiltersInterface
}>()
const emit = defineEmits<{
  (e: 'updateFilter', filterUpdate: FilterUpdate): void
}>()
</script>

<template>
  <div class="p-20 d-flex flex-column">
    <section class="mb-20">
      <h3 class="mb-10">Rechercher</h3>
      <input
        :value="filters.search"
        @input="emit('updateFilter', { search: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Rechercher"
      />
    </section>
    <section class="mb-20">
      <h3 class="mb-10">Trier par prix</h3>
      <div
        class="mb-5"
        v-for="priceRange in [
          [0, 10000],
          [800, 1000],
          [1000, 1500],
          [1500, 2000],
          [2000, 10000]
        ] as [number, number][]"
      >
        <input
          :checked="filters.priceRange[0] === priceRange[0]"
          type="radio"
          @input="emit('updateFilter', { priceRange })"
          name="priceRange"
          :id="priceRange[0].toString()"
        />
        <label :for="priceRange[0].toString()">
          {{
            priceRange[0] === 0
              ? 'Tous les prix'
              : priceRange[0] === 2000
                ? 'Plus de 2000€'
                : `Entre ${priceRange[0]}€ et ${priceRange[1]}€`
          }}
        </label>
      </div>
    </section>
    <section class="mb-20 flex-fill">
      <h3 class="mb-10">Trier par categories</h3>
      <p
        class="category"
        :class="{ selected: filters.category === category }"
        v-for="category in ['all', 'desktop', 'gamer', 'streaming'] as Category[]"
        @click="emit('updateFilter', { category })"
      >
        {{ category }}
      </p>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.category {
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.selected {
  font-weight: bold;
  text-decoration: underline;
}
</style>
