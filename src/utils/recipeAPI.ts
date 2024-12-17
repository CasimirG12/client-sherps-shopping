import { MeasureUnit } from "../types/ingredient";
import { Recipe } from "../types/recipe";

export const fetchRecipesAPI = async (userId: number): Promise<Recipe[]> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${userId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data && Array.isArray(data)) {
      return data;
    } else {
      return [] as Recipe[];
    }
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [] as Recipe[];
  }
};

export const deleteRecipeAPI = async (id: number): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

  } catch (error) {
    console.error("Failed to delete recipe: ", error);
  }
};

export const editUnitIngredientRecipeAPI = async (recipeId: number, ingredientId: number, unit: MeasureUnit): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/recipes/ingredients/${recipeId}/${ingredientId}/unit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          unit: unit,
        }),
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

  } catch (error) {
    console.error("Failed to update ingredient quantity: ", error);
  };
};

export const editValueIngredientRecipeAPI = async (
  recipeId: number,
  ingredientId: number,
  quantity: number
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/recipes/ingredients/${recipeId}/${ingredientId}/quantity`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

  } catch (error) {
    console.error("Failed to update ingredient quantity: ", error);
  };
};

export const _removeIngredientFromRecipe = (
  recipeId: number,
  ingredientId: number,
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
) => {
  setRecipes((prevRecipe) => {
    return prevRecipe.map((recipe) => {
      if (recipe.id === recipeId) {
        // Remove the ingredient from the recipe's ingredients array
        return {
          ...recipe,
          ingredients: recipe.ingredients.filter(
            (ingredient) => ingredient.id !== ingredientId
          ),
        };
      }
      return recipe;
    });
  });
};

export const deleteIngredientFromRecipeAPI = async (
  recipeId: number,
  ingredientId: number
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/shopping-lists/ingredients/${recipeId}/${ingredientId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to delete ingredient from shopping recipe: ", error);
  }
};

export const addIngredientToRecipeAPI = async (
  recipeId: number,
  ingredientName: string,
  quantity: number
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/recipes/${recipeId}/ingredients`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredientName: ingredientName,
          quantity: quantity,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

  } catch (error) {
    console.error("Failed to add ingredient to recipe:", error);
  }
};

export const addRecipeIngredientsToSLAPI = async (recipeId: number, shoppingListId: number): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/${recipeId}/shopping_lists/${shoppingListId}/ingredients`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to add ingredients from recipe to shopping list:", error);
  }
}