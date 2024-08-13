<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue';

const routers = [
    {
        to: "/",
        text: "Home"
    },

    {
        to: "/add",
        text: "Add"
    },
    {
      to: "/edit",
      text: "Edit"
    },
    {
      to: "/create",
      text: "Create"
    },
]

</script>

<template>
  
  <header>

    <div class="wrapper">
      <Nav v-bind:routers=routers></Nav>
      <!-- OR -->
      <!-- <Nav :routers=routers></Nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style>

@import './assets/bootstrap.min.css';

</style>