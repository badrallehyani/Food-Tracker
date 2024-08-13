<script setup>
import { ref } from 'vue';
import ManualCreate from './create_components/ManualCreate.vue';
/*

    - edit existing ingredients/meals

*/

const manualIsVisible = ref(false)
const autoIsVisible = ref(false)

function showManual(){
    autoIsVisible.value = false;
    manualIsVisible.value = true;
}
function showAuto(){
    autoIsVisible.value = true;
    manualIsVisible.value = false;
}

// this shouldnt be here but since
// the other option is not implemented yet
// this shows defualtltyl
showManual()

</script>

<template>

    <div class="d-flex flex-column align-items-center mt-4">
        <h5>Create A New Ingredient</h5>
        <div class="mb-3">
            <div class="form-check">
                <input checked=true @change="showManual" class="form-check-input" type="radio" id="manual" name="create-type">
                <label for="manual">Manual</label>
            </div>

            <div class="form-check">
                <input @change="showAuto" class="form-check-input" type="radio" id="auto" name="create-type">
                <label for="auto">Build With Ingredients</label>
            </div>
        </div>


        <div v-if="manualIsVisible" class="w-100">
            <ManualCreate/>
        </div>

        <div v-if="autoIsVisible">
            None
        </div>

    </div>

</template>