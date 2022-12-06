<template>
  <main class=" w-11/12 text-center mx-auto max-w-7xl pt-10">
    <div>
      <input class="" type="number" min="1" max="800" v-model.lazy.number="pokemonId">
    </div>
    <div v-if="loading">
      <i class='bx bx-loader bx-spin bx-sm' ></i>
    </div>
    <div v-else>
      <h2 class="leading-loose text-2xl">{{ results.name }}</h2>
      <figure>
        <img class=" mx-auto" :src="results.sprites.front_default" :alt="results.name">
        <figcaption>{{ results.name }}</figcaption>
      </figure>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { usePokemon } from '../composable/api-core'

const pokemonId = ref(132)

const {
  loading,
  results
} = usePokemon(pokemonId)
</script>