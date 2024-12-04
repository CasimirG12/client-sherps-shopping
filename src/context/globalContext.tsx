import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingList } from "../types/shoppingList";
import { Recipe } from "../types/recipe";
import { useAuthContext } from "./authContext";

export type GlobalContextType = {
  shoppingLists: ShoppingList[];
  recipes: Recipe[];
  fetchShoppingLists: () => Promise<ShoppingList[]>;
  addIngredientToShoppingList: (
    shoppingListId: number,
    ingredientName: string,
    quantity: number
  ) => Promise<void>;
  addShoppingList: (slName: string) => Promise<void>;
  deleteShoppingList: (id: number) => Promise<void>;
  deleteIngredientFromShoppingList: (
    shoppingListId: number,
    ingredientId: number
  ) => Promise<void>;
};

const globalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { user } = useAuthContext();

  const fetchShoppingLists = async (): Promise<ShoppingList[]> => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/shopping-lists/${user?.id}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data)) {
        setShoppingLists(data);
        return data;
      } else {
        return [] as ShoppingList[];
      }
    } catch (error) {
      console.error("Failed to fetch shopping lists:", error);
      return [] as ShoppingList[];
    }
  };

  const addIngredientToShoppingList = async (
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
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const updatedShoppingLists = await fetchShoppingLists();
      setShoppingLists(updatedShoppingLists);
    } catch (error) {
      console.error("Failed to add ingredient to shopping list:", error);
    }
  };

  const addShoppingList = async (slName: string) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    try {
      const response = await fetch(`${API_BASE_URL}/api/shopping-lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: slName,
          user_id: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const updatedShoppingLists = await fetchShoppingLists();
      setShoppingLists(updatedShoppingLists);
    } catch (error) {
      console.error("Failed to add shopping list: ", error);
    }
  };

  const deleteShoppingList = async (id: number) => {
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
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const updatedShoppingLists = shoppingLists.filter((sl) => sl.id !== id);
      setShoppingLists(updatedShoppingLists);
    } catch (error) {
      console.error("Failed to add shopping list: ", error);
    }
  };

  const _removeIngredientFromList = (
    shoppingListId: number,
    ingredientId: number
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

  const deleteIngredientFromShoppingList = async (
    shoppingListId: number,
    ingredientId: number
  ): Promise<void> => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/shopping-lists/ingredients/${shoppingListId}/${ingredientId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      _removeIngredientFromList(shoppingListId, ingredientId);
    } catch (error) {
      console.error("Failed to delete ingredient from shopping list: ", error);
    }
  };

  return (
    <globalContext.Provider
      value={{
        shoppingLists,
        recipes,
        fetchShoppingLists,
        addIngredientToShoppingList,
        addShoppingList,
        deleteShoppingList,
        deleteIngredientFromShoppingList,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
