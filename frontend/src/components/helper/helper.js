const defaultIngredients = [
    { id: 0, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { id: 1, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    { id: 2, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 3, name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13 },
    { id: 4, name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.6 },
    { id: 5, name: "Broccoli", calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
    { id: 6, name: "Egg", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
    { id: 7, name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { id: 8, name: "Avocado", calories: 320, protein: 4, carbs: 17, fat: 29 },
    { id: 9, name: "Greek Yogurt", calories: 100, protein: 18, carbs: 6, fat: 0.7 },
    { id: 10, name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14 },
    { id: 11, name: "Sweet Potato", calories: 180, protein: 2, carbs: 41, fat: 0.1 },
    { id: 12, name: "Quinoa", calories: 222, protein: 8, carbs: 39, fat: 3.6 },
    { id: 13, name: "Blueberries", calories: 84, protein: 1.1, carbs: 21, fat: 0.5 },
    { id: 14, name: "Olive Oil", calories: 119, protein: 0, carbs: 0, fat: 13.5 },
    { id: 15, name: "Beef Steak", calories: 271, protein: 26, carbs: 0, fat: 18 },
    { id: 16, name: "Tofu", calories: 144, protein: 17, carbs: 3, fat: 8 },
    { id: 17, name: "Lentils", calories: 230, protein: 18, carbs: 40, fat: 1 },
    { id: 18, name: "Oats", calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
    { id: 19, name: "Milk", calories: 103, protein: 8, carbs: 12, fat: 2.4 },
    { id: 20, name: "Peanut Butter", calories: 188, protein: 8, carbs: 6, fat: 16 },
    { id: 21, name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
    { id: 22, name: "Cottage Cheese", calories: 163, protein: 28, carbs: 6.2, fat: 2.3 },
    { id: 23, name: "Asparagus", calories: 27, protein: 2.9, carbs: 5.2, fat: 0.2 },
    { id: 24, name: "Cucumber", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1 },
    { id: 25, name: "Whole Wheat Bread", calories: 247, protein: 13, carbs: 41, fat: 3.4 },
    { id: 26, name: "Tuna", calories: 184, protein: 40, carbs: 0, fat: 1 },
    { id: 27, name: "Carrot", calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
    { id: 28, name: "Hummus", calories: 166, protein: 7.9, carbs: 14, fat: 9.6 },
    { id: 29, name: "Mozzarella Cheese", calories: 280, protein: 28, carbs: 3.1, fat: 17 }
];
const defaultMealsRecords = [{"id":0,"ingredientID":0,"quantity":100},{"id":1,"ingredientID":9,"quantity":100}]

export async function getIngredients(){
    var ingredients = JSON.parse(localStorage.getItem("ingredients"))

    if(ingredients == null || ingredients.length == 0){
        ingredients = defaultIngredients

        setIngredients(ingredients)
        setMealsRecords(defaultMealsRecords)
    }
      
    return ingredients
}

async function setIngredients(ingredients){
    localStorage.setItem("ingredients", JSON.stringify(ingredients))
}

export async function addIngredient(name, calories, protein, carbs){
    const ingredients = await getIngredients()
    const newID = ingredients[ingredients.length - 1].id + 1
    ingredients.push({
        id: newID,
        name: name,
        calories: calories,
        protein: protein,
        carbs: carbs
    })
    setIngredients(ingredients)
}

export async function editIngredient(ingredient) {
    const ingredients = await getIngredients()

    const targetIndex = ingredients.findIndex(e=>{
        return e.id == ingredient.id
    })
    
    ingredients[targetIndex] = ingredient

    await setIngredients(ingredients)
}

export async function deleteIngredient(ingredient) {
    const ingredients = await getIngredients()
    const newIngredients = ingredients.filter( e=> e.id != ingredient.id )

    await setIngredients(newIngredients)
}

async function setMealsRecords(mealsRecords){
    localStorage.setItem("meals", JSON.stringify(mealsRecords))
}

export async function addMealRecord(index, quantity){
    var currentMeals = await getMealsRecords()
    
    var newID;
    if(currentMeals.length == 0)
        newID = 0
    else
        newID = currentMeals[currentMeals.length - 1].id + 1

    currentMeals.push({
        id: newID,
        ingredientID: index,
        quantity: quantity
    })

    setMealsRecords(currentMeals)

    return true
}






export async function getMeals(){
    const ingreds = await getIngredients()
    const mealsRecords = await getMealsRecords()

    const meals = mealsRecords.map((m)=>{
        const targetIngredient = ingreds.find(ingredient=> ingredient.id == m.ingredientID)

        if(targetIngredient == undefined){
            // this happens if the record references an ingredient that
            // has been deleted
            return null
        }

        return {
            id: m.id,
            ingredient: targetIngredient,
            quantity: m.quantity
        }
    // we need to filter out (remove) the null values caused by the if-statement above
    }).filter( e=> e != null ) 

    return meals
}




export async function getMealsRecords(){
    const response = JSON.parse(localStorage.getItem("meals"))
    return response == null? []: response
}

export async function deleteMeal(mealID){
    const mealsRecords = await getMealsRecords();
    const newMealsRecords = mealsRecords.filter( mealRecord=> mealRecord.id != mealID )

    setMealsRecords(newMealsRecords)
    return true
}

export default {
    getIngredients, 
    addMealRecord, 
    getMealsRecords, 
    getMeals, 
    addIngredient, 
    deleteMeal
}