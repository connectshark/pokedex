import { isRef, onBeforeMount, ref, watch, watchEffect } from 'vue'
const URI = import.meta.env.VITE_API_URI

const usePokemon = (pokemonId) => {
  const loading = ref(false)
  const results = ref({})

  const fetchPokemon = async (id) => {
    loading.value = true
    const fetch_response = await fetch(URI + `/pokemon/${id}`)
    const res = await fetch_response.json()
    results.value = res
    loading.value = false
  }

  if (isRef(pokemonId)) {
    watchEffect(() => {
      fetchPokemon(pokemonId.value)
    })
  } else {
    watch(pokemonId, value => {
      fetchPokemon(value)
    })
  }

  return {
    loading,
    results
  }
}

export {
  usePokemon
}