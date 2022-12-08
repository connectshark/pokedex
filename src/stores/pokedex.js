import { defineStore } from 'pinia'

export const usePokeDexStore = defineStore({
  id: 'pokeDex',
  state: () => ({
    pokemon: []
  }),
  actions: {
    init () {
      fetch('https://cdn.jsdelivr.net/gh/Purukitto/pokemon-data.json/pokedex.json')
        .then(r => r.json())
        .then(r => {
          this.pokemon = r
        })
    }
  }
})
