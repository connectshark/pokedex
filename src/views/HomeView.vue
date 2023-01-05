<template>
  <main class=" w-11/12 text-center mx-auto max-w-7xl pt-10">
    <div>
      <input list="pokemonNumber" class="border border-stone-800 rounded-lg p-2 appearance-none" type="text" minlength="1" maxlength="3"
        v-model.lazy.number="pokemonId">
    </div>

    <div v-if="(pokedex.pokemon.length > 0)">
      <figure>
        <img :key="targetPokemon.id" class="mx-auto w-36" :src="targetPokemon.image.hires" :alt="targetPokemon.name.chinese">
        <figure>{{ targetPokemon.name.chinese }}</figure>
      </figure>
    </div>
    <h2>種族值</h2>
    <div class=" w-60 mx-auto h-60" ref="chartRef"></div>
    <datalist id="pokemonNumber">
      <option v-for="pokemon in pokedex.pokemon" :value="pokemon.id">
        {{ pokemon.name.chinese }}
      </option>
    </datalist>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePokeDexStore } from '../stores/pokedex'
import { useChart } from '../composable/chart-core'

const pokedex = usePokeDexStore()
pokedex.init()

const pokemonId = ref(748)

const targetPokemon = computed(() => {
  return pokedex.pokemon.find(poke => poke.id === pokemonId.value)
})

const radarChartData = computed(() => {
  if (pokedex.pokemon.length > 0) {
    const base = targetPokemon.value.base
    return [base.HP, base['Sp. Attack'], base['Sp. Defense'], base.Speed, base.Defense, base.Attack]
  } else {
    return [1, 1, 1, 1, 1, 1 ]
  }
})

const chartRef = ref(null)

useChart({
  target: chartRef,
  data: radarChartData
})
</script>