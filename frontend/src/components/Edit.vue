<script setup lang="ts">
import { ref } from 'vue';
import { deleteIngredient, editIngredient, getIngredients } from './helper/helper';
import IconEdit from './icons/IconEdit.vue';
import IconSave from './icons/IconSave.vue';
import IconDelete from './icons/IconDelete.vue';

// save button should be disabled
// while the savnig process is processing
// to avoid sending two save requests.

const ingredients = ref([]);
const loaded = ref(false);

(async function(){
    // simulate loading
    await new Promise(r => setTimeout(r, 500));

    const response = await getIngredients()
    loaded.value = true;

    console.log("const response = await getIngredients()")
    ingredients.value = response.map( (e)=>{
        return {
            ...e,
            editable: false,
            visible: true
        }
    })
})()

</script>

<template>
    <div class="d-flex flex-column align-items-center mt-4">

        <div v-if="!loaded">
            <h4>Loading</h4>
        </div>

        <div class="d-flex" v-for="ingr in ingredients">
            
            <div class="d-flex mb-3 border-bottom" v-if="ingr.visible">

                <div v-if="!ingr.editable">
                    <button  @click="ingr.editable = true" class="btn btn-sm btn-secondary me-2">
                        <IconEdit />
                    </button>   
                </div>

                <div v-else class="d-flex flex-column">
                    <button @click="()=>{
                        ingr.editable = false;
                        editIngredient(ingr);
                    }" class="btn btn-sm btn-success h-50 me-2">
                        <IconSave/>
                    </button>

                    <button @click="()=>{
                        ingr.visible = false;
                        deleteIngredient(ingr)
                    }" class="btn btn-sm btn-danger h-50 me-2">
                        <IconDelete/>
                    </button>
                </div>

                

                <div class="d-flex flex-column">
                    <!-- the ingredient name that appears in both edit and non-edit modes -->
                    <input v-model="ingr.name" :disabled="!ingr.editable" class="form-control">

                    <div class="d-flex flex-column" v-if="ingr.editable">
                        <!-- The Edit inputs that appears when in edit mode -->
                        <span><strong>Calories</strong></span>
                        <input v-model="ingr.calories" class="form-control">

                        <span><strong>Protein</strong></span>
                        <input v-model="ingr.protein" class="form-control">

                        <span><strong>Carbs</strong></span>
                        <input v-model="ingr.carbs" class="form-control">
                    </div>

                </div>
            </div>
            
            



        </div>
    </div>
</template>