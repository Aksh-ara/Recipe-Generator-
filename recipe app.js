
const searchBox = document.querySelector('.searchBox'); 
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');


async function fetchRecipesByIngredient(ingredients) {
    try {
        
        recipeContainer.innerHTML = '';

        
        const ingredientArray = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

        
        const recipePromises = ingredientArray.map(ingredient => 
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
            .then(response => response.json())
        );

        
        const results = await Promise.all(recipePromises);

        
        let recipeLists = results.map(result => result.meals).filter(meals => meals);

        
        if (recipeLists.length === 0) {
            recipeContainer.innerHTML = `<p>No recipes found with the provided ingredients!</p>`;
            return;
        }

        const commonRecipes = recipeLists.reduce((acc, meals) => {
            
            return acc.filter(recipe => meals.some(meal => meal.idMeal === recipe.idMeal));
        });

        
        if (commonRecipes.length === 0) {
            recipeContainer.innerHTML = `<p>No recipes found using all of the provided ingredients!</p>`;
            return;
        }

        // Loop through the meals and create HTML to display each recipe
        commonRecipes.forEach(meal => {
            const mealHTML = `
                <div class="recipe-card">
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p><a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a></p>
                </div>
            `;
            // Append each recipe's HTML to the container
            recipeContainer.innerHTML += mealHTML;
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        recipeContainer.innerHTML = '<p>There was an error fetching the data.</p>';
    }
}

// Event listener for when the search button is clicked
searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const ingredients = searchBox.value.trim(); // Get the input value and remove extra spaces
    if (ingredients) {
        fetchRecipesByIngredient(ingredients); // Call the function with the entered ingredients
    } else {
        recipeContainer.innerHTML = '<p>Please enter at least one ingredient!</p>';
    }
});




