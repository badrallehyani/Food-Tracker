<script setup>

const model = defineModel()

defineProps({
    disabled:{
        type: Boolean,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    oninput: {
        type: Function,
        required: false
    },

    inputType: {
        type: String,
        required: false
    },


    prependText:{
        type: String,
        required: false
    },
    prependBefore: {
        type: Boolean,
        required: false
    },
    prependAfter: {
        type: Boolean,
        required: false
    },

    width: {
        type: String,
        required: false
    }
})

</script>


<template>

<div class="d-flex justify-content-center mb-2 custom-input-container" 
    :class='"w-" + (width? width: "unused")'
>

    <span class="input-group-text" v-if="prependBefore">{{ prependText }}</span>

    <input class="form-control"
        v-model="model"
        :disabled="disabled"
        @input="oninput"
        :type="inputType"
        :placeholder="title"
        
    >

    <span class="input-group-text" v-if="prependAfter">{{ prependText }}</span>

</div>

</template>



<style scoped>

</style>