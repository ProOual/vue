<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Boutique from './features/boutique/Boutique.vue'
import Admin from './features/admin/Admin.vue'
import { reactive, type Component as C } from 'vue'
import type { Page } from './interface'
import { seed, seed40articles } from './data/seed'

const state = reactive<{
  page: Page
}>({
  page: 'Boutique'
})

const pages: { [s: string]: C } = {
  Boutique,
  Admin
}
function navigate(page: Page): void {
  state.page = page
}
//seed('vueprojectproducts') //N’oubliez pas de commenter !
//seed40articles('vueprojectproducts')
</script>

<template>
  <div class="app-container">
    <TheHeader @navigate="navigate" :page="state.page" class="header" />
    <div class="app-content">
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>
    </div>
    <TheFooter class="footer hide-xs" />
  </div>
</template>

<style lang="scss">
@use './assets/base.scss' as *;

.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}

.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>
