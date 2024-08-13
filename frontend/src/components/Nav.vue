
<script setup>
defineProps({
  routers: {
    type: Array,
    required: true
  }
})
</script>

<template>

    <main>
        <nav class="navbar">
            <RouterLink
                v-for="router in routers" 
                    :to="router.to" 
            >
                    {{ router.text }}
            </RouterLink>
        </nav>
    </main>

</template>

<style scoped>
nav{
    display: flex;
    justify-content: center;
}

.router-link-active, .router-link-exact-active{
    font-weight: bold;
}
a{
    padding: 0px 10px;
    font-size: larger;
    color: black;
    text-decoration: none;
}
</style>