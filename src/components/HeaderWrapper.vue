<template>
  <header class=" shadow-md ">
    <div class="p-4 container mx-auto flex items-center justify-between">
      <h1 class=" shrink-0">
        <router-link class="hover:opacity-80 text-primary" to="/">PokeDex</router-link>
      </h1>
      <nav>
        <ul>
          <li v-for="item in navList" :key="item.link">
            <router-link :to="item.link">{{ item.title }}</router-link>
          </li>
        </ul>
      </nav>
      <button class=" md:hidden" @click="(isShow = !isShow)">
        <i v-if="isShow" class='bx bx-x align-middle bx-sm'></i>
        <i v-else class='bx bx-menu align-middle bx-sm'></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isShow = ref(false)

const navList = [
  {
    title: '首頁',
    link: '/'
  }
]
</script>