<script setup>
import { ref } from 'vue';
import CustomInput from './components_helpers/CustomInput.vue';

import {getIngredients, addMealRecord} from './helper/helper';

const foodIngredients = ref([])
const match = ref([])

function getInputRefs(value, disabled, visible) {
    return [ref(value), ref(disabled), ref(visible)]
}

function restoreDefaults(){
    nameInputIsDisabled.value = false
    nameInputValue.value = ""

    quantityInputValue.value = 1
    quantityInputIsVisible.value = false;
    quantityInputIsDisabled.value = false

    addButtonIsDisabled.value = false
    buttonsAreVisible.value = false;
}


// Name Input Stuff
const [nameInputValue, nameInputIsDisabled, nameInputIsVisible] = ["", true, true].map( e=>{
    return ref(e)
} )
const inputPlaceHolder = ref("Loading")

function nameOnInput() {
    const keyword = nameInputValue.value.toLowerCase()

    if(keyword.trim() === ""){
        match.value = []
        return
    }

    match.value = foodIngredients.value.filter((e) =>
        e.name.toLowerCase().includes(keyword)
    )
}
// Quantity Input Stuff
const [quantityInputValue, quantityInputIsDisabled, quantityInputIsVisible] = getInputRefs("1", false, false);

// Add Button Stuff
const buttonsAreVisible = ref(false)
const addButtonIsDisabled = ref(false)

async function addButtonOnClick(){
    const quantity = parseInt(quantityInputValue.value)
    const index = selectedIngredientIndex.value
    
    if(quantity < 1){
        alert("invalid quantity")
        quantityInputValue.value = 1
        return
    }

    quantityInputIsDisabled.value = true;
    addButtonIsDisabled.value = true

    await addMealRecord(index, quantity)
    
    restoreDefaults()
    alert("Added! Go Home to See it!")
}

// selected ingredient
const selectedIngredientIndex = ref(-1);

// selecting the ingredient
function selectIngredient(ingredient){
    selectedIngredientIndex.value = ingredient.id
    
    nameInputValue.value = ingredient.name
    nameInputIsDisabled.value = true

    match.value = []

    quantityInputIsVisible.value = true
    buttonsAreVisible.value = true
}

// 
(async function (){
    // simulate loading
    await new Promise(r => setTimeout(r, 500));
    
    const response = await getIngredients();
    foodIngredients.value = response

    inputPlaceHolder.value = "Names"
    nameInputIsDisabled.value = false;
})()

</script>


<template>

    <div class="d-flex flex-column align-items-center mt-4">
        <h5>Add to the Tracker</h5>

        <CustomInput 
            v-if="nameInputIsVisible" 
            v-model.trim="nameInputValue" 
            
            :disabled="nameInputIsDisabled" 
            :oninput="nameOnInput"

            :title=inputPlaceHolder
            inputType="text"
            class="responsive-width"
            
        />
        
        <div class="search-result-container list-group overflow-auto responsive-width" v-if="match.length">
            <div class="search-result list-group-item list-group-item-action" v-for="m in match" @click="selectIngredient(m)">{{ m.name }}</div>
        </div>

        <div v-else-if="nameInputValue.trim() === ''">Type in an Ingredient Name</div>
        <div v-else-if="selectedIngredientIndex == -1">No Match</div>
        

        <CustomInput 
            v-if="quantityInputIsVisible" 
            v-model.number="quantityInputValue" 
            
            :disabled="quantityInputIsDisabled"

            title="Quantity"
            inputType = "number"

            :prependAfter = true
            prependText="grams"

            class="responsive-width"
        />

        <div class="d-flex gap-2">
            <button 
                v-if="buttonsAreVisible" 
                :disabled="addButtonIsDisabled" 
                @click="addButtonOnClick"
                class="btn btn-success" 
            >Add</button>

            <button 
                v-if="buttonsAreVisible"
                :disabled="addButtonIsDisabled" 
                @click="restoreDefaults"
                class="btn btn-danger"  
            >Clear</button>
        </div>
        
    </div>

</template>

<style>



</style>