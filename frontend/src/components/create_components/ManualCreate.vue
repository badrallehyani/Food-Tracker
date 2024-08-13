<script setup>
import CustomInput from '@/components/components_helpers/CustomInput.vue'
import { ref } from 'vue';
import { addIngredient } from '../helper/helper';

const nameInputValue = ref("");
const caloriesInputValue = ref("");
const proteinInputValue = ref("");
const carbsInputValue = ref("");

const inputsAreDisabled = ref(false);

async function addOnClick(){
    var values = [
        caloriesInputValue.value,
        proteinInputValue.value,
        carbsInputValue.value
    ]
    
    // checking for negative numbers
    const badNumbers = values.filter(e=> e < 0)
    if(badNumbers.length){
        alert(`Bad Number(s) ${badNumbers}`)
        return
    }

    // check if the values are empty
    const allEmpty = values.filter(e=>e=="").length == values.length
    if(allEmpty){
        alert("All Empty")
        return
    }

    inputsAreDisabled.value = true

    // given at least an input is written, all others are assumed to be 0
    values = values.map(e=>{
        if(e == "")
            return 0
        return e;
    })

    // simulate loading
    await new Promise(r => setTimeout(r, 500));

    await addIngredient(
        nameInputValue.value,
        caloriesInputValue.value,
        proteinInputValue.value,
        carbsInputValue.value
    )
    
    inputsAreDisabled.value = false
    alert("Created! Go to Add (a new meal) to See it!")
}

</script>

<template>
    
    <div class="d-flex flex-column align-items-center">
        <CustomInput 
            v-model.trim="nameInputValue"
            :disabled="inputsAreDisabled"
            input-type="text"
            title="Name"

            class="responsive-width"
        />
        <CustomInput 
            v-model.trim="caloriesInputValue"
            :disabled="inputsAreDisabled"
            input-type="number"
            title="Calories (per 100g)"

            class="responsive-width"
        />
        <CustomInput 
            v-model.trim="proteinInputValue"
            :disabled="inputsAreDisabled"
            input-type="number"
            title="Protein (per 100g)"

            class="responsive-width"
        />
        <CustomInput 
            v-model.trim="carbsInputValue"
            :disabled="inputsAreDisabled"
            input-type="number"
            title="Carbs (per 100g)"

            class="responsive-width"
        />

        <button @click="addOnClick" :disabled="inputsAreDisabled" class="btn btn-success">Add</button>
    </div>

</template>


<style scoped>

</style>