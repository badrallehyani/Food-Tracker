<script setup>
import { ref } from 'vue';
import { getMeals, deleteMeal as deleteMealFromDB } from './helper/helper';


const meals = ref([])
const loaded = ref(false)

const mealsTotal = ref({
    Calories: 0,
    Protein: 0,
    Carbs: 0,
})

async function deleteMeal(e, mealID){
    e.target.disabled = true;
    // delete from db (localstorage for now)
    await deleteMealFromDB(mealID)
    // delete from array
    meals.value = meals.value.filter(meal=> meal.id != mealID)
    updateTotals(meals.value)
}

async function updateTotals(meals) {
    mealsTotal.value.Carbs = 0
    mealsTotal.value.Protein = 0
    mealsTotal.value.Calories = 0

    meals.forEach(e => {
        mealsTotal.value.Carbs += e.ingredient.carbs * (e.quantity / 100),
        mealsTotal.value.Protein += e.ingredient.protein * (e.quantity / 100),
        mealsTotal.value.Calories += e.ingredient.calories * (e.quantity / 100)
    }) 
}

(async function(){
    // simulate loading
    await new Promise(r => setTimeout(r, 500));

    const response = await getMeals()
    meals.value = response
    updateTotals(meals.value)

    loaded.value = true
})()

const containerClasses = "d-flex flex-column justify-content-center align-items-center mt-4"
</script>

<template>

<div :class="containerClasses" v-if="!loaded">
    <h4>Loading</h4>
</div>

<div :class="containerClasses" v-else-if="meals.length">
    <div class="table responsive-width">
        <div class="item-row" v-for="meal in meals">
            <div class="d-flex" :key="meal.id">
                <button @click="(e)=>deleteMeal(e, meal.id)" class="me-2 btn btn-danger">x</button>
                <span class="item-name">{{ meal.ingredient.name }}</span>
            </div>
            <span class="quantity"> {{ meal.quantity }}g</span>
        </div>
    </div>

    <div class="total-container responsive-width">
        <div class="total-row" v-for="totalKey in Object.keys(mealsTotal)">

            <span class="total-key">{{ totalKey }}</span> 

            <span class="total-value">
                {{ Math.round(mealsTotal[totalKey] * 10) / 10 }}
            </span>

        </div>
        
    </div>
</div>

<div :class="containerClasses" v-else>
    <h4>Nothing</h4>
</div>


</template>



<style scoped>

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: white;
    border-radius: 8px;
    padding: 20px;
}


.total-container{
    margin-top: 30px;
    font-size: x-large;
}
.total-row{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.total-key{
    font-weight: bolder;
}

.item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 2px dashed #eee;
}
.item-row:last-child {
    border-bottom: none;
}
.item-name {
    font-weight: bold;
    font-size: larger;
}
.quantity {
    color: #666;
}

</style>