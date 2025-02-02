# Simple recipe generating app

# A dictionary of recipes where the key is the recipe name and the value is a list of ingredients
recipes = {
    "Pasta Carbonara": ["spaghetti", "bacon", "egg", "parmesan", "black pepper"],
    "Pancakes": ["flour", "egg", "milk", "butter", "baking powder"],
    "Omelette": ["egg", "milk", "cheese", "salt", "pepper"],
    "Salad": ["lettuce", "tomato", "cucumber", "olive oil", "vinegar"],
    "Grilled Cheese": ["bread", "cheese", "butter"]
}

# Function to suggest recipes based on available ingredients
def suggest_recipe(available_ingredients):
    available_ingredients_set = set(available_ingredients)
    matched_recipes = []

    # Loop through each recipe to check if it can be made with the available ingredients
    for recipe, ingredients in recipes.items():
        recipe_ingredients_set = set(ingredients)
        if recipe_ingredients_set.issubset(available_ingredients_set):
            matched_recipes.append(recipe)

    if matched_recipes:
        print("\nYou can make the following recipes:")
        for recipe in matched_recipes:
            print(f"- {recipe}")
    else:
        print("\nSorry, no recipes match your ingredients.")

# Main function
def main():
    print("Welcome to the Recipe Generator!")
    print("Enter the ingredients you have (comma separated):")

    # Get input from the user
    user_input = input("Your ingredients: ")
    available_ingredients = [ingredient.strip().lower() for ingredient in user_input.split(',')]

    # Call the function to suggest recipes
    suggest_recipe(available_ingredients)

# Run the program
if __name__ == "__main__":
    main()
