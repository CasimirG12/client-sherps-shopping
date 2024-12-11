import { MeasureUnit } from "../types/ingredient";
import { ShoppingList } from "../types/shoppingList";

export const fetchShoppingListsAPI = async (userId: number): Promise<ShoppingList[]> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/shopping-lists/${userId}`,{
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (data && Array.isArray(data)) {
      return data;
    } else {
      return [] as ShoppingList[];
    }
  } catch (error) {
    console.error("Failed to fetch shopping lists:", error);
    return [] as ShoppingList[];
  }
};

export const addShoppingListAPI = async (slName: string, userId: number): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(`${API_BASE_URL}/api/shopping-lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: slName,
        user_id: userId,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

  } catch (error) {
    console.error("Failed to add shopping list: ", error);
  }
};

export const deleteShoppingListAPI = async (id: number): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(`${API_BASE_URL}/api/shopping-lists/`, {
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
    console.error("Failed to delete shopping list: ", error);
  }
};

export const addIngredientToShoppingListAPI = async (
  shoppingListId: number,
  ingredientName: string,
  quantity: number
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/shopping-lists/${shoppingListId}/ingredients`,
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
    console.error("Failed to add ingredient to shopping list:", error);
  }
};

export const editValueIngredientShoppingListAPI = async (
  shoppingListId: number,
  ingredientId: number,
  quantity: number
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/shopping-lists/ingredients/${shoppingListId}/${ingredientId}/quantity`,
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
  }
};

export const editUnitIngredientShoppingListAPI = async (shoppingListId: number, ingredientId: number, unit: MeasureUnit): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/shopping-lists/ingredients/${shoppingListId}/${ingredientId}/unit`,
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
  }

}

export const _removeIngredientFromList = (
  shoppingListId: number,
  ingredientId: number,
  setShoppingLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>
) => {
  setShoppingLists((prevShoppingLists) => {
    return prevShoppingLists.map((list) => {
      if (list.id === shoppingListId) {
        // Remove the ingredient from the list's ingredients array
        return {
          ...list,
          ingredients: list.ingredients.filter(
            (ingredient) => ingredient.id !== ingredientId
          ),
        };
      }
      return list;
    });
  });
};

export const deleteIngredientFromShoppingListAPI = async (
  shoppingListId: number,
  ingredientId: number
): Promise<void> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/shopping-lists/ingredients/${shoppingListId}/${ingredientId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to delete ingredient from shopping list: ", error);
  }
};