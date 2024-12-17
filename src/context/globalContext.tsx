import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingList } from "../types/shoppingList";
import { useAuthContext } from "./authContext";
import { Recipe } from "../types/recipe";
import {
  _removeIngredientFromRecipe,
  addIngredientToRecipeAPI,
  addRecipeIngredientsToSLAPI,
  deleteIngredientFromRecipeAPI,
  deleteRecipeAPI,
  editUnitIngredientRecipeAPI,
  editValueIngredientRecipeAPI,
  fetchRecipesAPI,
} from "../utils/recipeAPI";
import {
  _removeIngredientFromList,
  addIngredientToShoppingListAPI,
  addShoppingListAPI,
  deleteIngredientFromShoppingListAPI,
  deleteShoppingListAPI,
  editUnitIngredientShoppingListAPI,
  editValueIngredientShoppingListAPI,
  fetchShoppingListsAPI,
} from "../utils/shoppingListAPI";
import { MeasureUnit } from "../types/ingredient";

export type GlobalContextType = {
  shoppingLists: ShoppingList[];
  recipes: Recipe[];
  fetchShoppingLists: () => Promise<void>;
  fetchRecipes: () => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
  editUnitIngredientRecipe: (
    recipeId: number,
    ingredientId: number,
    unit: MeasureUnit
  ) => Promise<void>;
  editValueIngredientRecipe: (
    recipeId: number,
    ingredientId: number,
    quantity: number
  ) => Promise<void>;
  deleteIngredientFromRecipe: (
    recipeId: number,
    ingredientId: number
  ) => Promise<void>;
  addIngredientToRecipe: (
    recipeId: number,
    ingredientName: string,
    quantity: number
  ) => Promise<void>;
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
  editValueIngredientShoppingList: (
    shoppingListId: number,
    ingredientId: number,
    quantity: number
  ) => Promise<void>;
  editUnitIngredientShoppingList: (
    shoppingListId: number,
    ingredientId: number,
    unit: MeasureUnit
  ) => Promise<void>;
  addRecipeIngredientsToSL: (
    recipeId: number,
    shoppingListId: number
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

  const fetchShoppingLists = async (): Promise<void> => {
    try {
      if (!user) {
        return;
      }
      const fetchedShoppingLists = await fetchShoppingListsAPI(user.id);
      setShoppingLists(fetchedShoppingLists);
    } catch (error) {
      console.error("Failed to fetch Shopping Lists: ", error);
      return;
    }
  };

  const fetchRecipes = async (): Promise<void> => {
    try {
      if (!user) {
        return;
      }
      const fetchedRecipes = await fetchRecipesAPI(user.id);
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Failed to fetch recipes: ", error);
      return;
    }
  };

  const addIngredientToShoppingList = async (
    shoppingListId: number,
    ingredientName: string,
    quantity: number
  ): Promise<void> => {
    try {
      await addIngredientToShoppingListAPI(
        shoppingListId,
        ingredientName,
        quantity
      );
      await fetchShoppingLists();
    } catch (error) {
      console.error("Failed to add ingredient to shopping list:", error);
    }
  };

  const addIngredientToRecipe = async (
    recipeId: number,
    ingredientName: string,
    quantity: number
  ): Promise<void> => {
    try {
      await addIngredientToRecipeAPI(recipeId, ingredientName, quantity);
      await fetchRecipes();
    } catch (error) {
      console.error("Failed to add ingredient to recipe:", error);
    }
  };

  const addShoppingList = async (slName: string) => {
    try {
      if (!user) {
        return;
      }
      await addShoppingListAPI(slName, user.id);
      await fetchShoppingLists();
    } catch (error) {
      console.error("Failed to add shopping list: ", error);
    }
  };

  const deleteShoppingList = async (id: number) => {
    try {
      await deleteShoppingListAPI(id);
      const updatedShoppingLists = shoppingLists.filter((sl) => sl.id !== id);
      setShoppingLists(updatedShoppingLists);
    } catch (error) {
      console.error("Failed to add shopping list: ", error);
    }
  };

  const deleteRecipe = async (id: number) => {
    try {
      await deleteRecipeAPI(id);
      const updatedRecipes = recipes.filter((sl) => sl.id !== id);
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Failed to add shopping list: ", error);
    }
  };

  const deleteIngredientFromShoppingList = async (
    shoppingListId: number,
    ingredientId: number
  ): Promise<void> => {
    try {
      await deleteIngredientFromShoppingListAPI(shoppingListId, ingredientId);
      _removeIngredientFromList(shoppingListId, ingredientId, setShoppingLists);
    } catch (error) {
      console.error("Failed to delete ingredient from shopping list: ", error);
    }
  };

  const deleteIngredientFromRecipe = async (
    recipeId: number,
    ingredientId: number
  ): Promise<void> => {
    try {
      await deleteIngredientFromRecipeAPI(recipeId, ingredientId);
      _removeIngredientFromRecipe(recipeId, ingredientId, setRecipes);
    } catch (error) {
      console.error("Failed to delete ingredient from shopping list: ", error);
    }
  };

  const editValueIngredientShoppingList = async (
    shoppingListId: number,
    ingredientId: number,
    quantity: number
  ): Promise<void> => {
    try {
      await editValueIngredientShoppingListAPI(
        shoppingListId,
        ingredientId,
        quantity
      );
      await fetchShoppingLists();
    } catch (error) {
      console.error("Failed to update ingredient quantity: ", error);
    }
  };

  const editValueIngredientRecipe = async (
    recipeId: number,
    ingredientId: number,
    quantity: number
  ): Promise<void> => {
    try {
      await editValueIngredientRecipeAPI(recipeId, ingredientId, quantity);
      await fetchRecipes();
    } catch (error) {
      console.error("Failed to update ingredient quantity: ", error);
    }
  };

  const editUnitIngredientShoppingList = async (
    shoppingListId: number,
    ingredientId: number,
    unit: MeasureUnit
  ): Promise<void> => {
    try {
      await editUnitIngredientShoppingListAPI(
        shoppingListId,
        ingredientId,
        unit
      );
      await fetchShoppingLists();
    } catch (error) {
      console.error("Failed to update ingredient quantity: ", error);
    }
  };

  const editUnitIngredientRecipe = async (
    recipeId: number,
    ingredientId: number,
    unit: MeasureUnit
  ): Promise<void> => {
    try {
      await editUnitIngredientRecipeAPI(recipeId, ingredientId, unit);
      await fetchRecipes();
    } catch (error) {
      console.error("Failed to update ingredient quantity: ", error);
    }
  };

  const addRecipeIngredientsToSL = async (
    recipeId: number,
    shoppingListId: number
  ): Promise<void> => {
    try {
      await addRecipeIngredientsToSLAPI(recipeId, shoppingListId);
    } catch (error) {
      console.error(
        "Failed to add ingredients from recipe to shopping list:",
        error
      );
    }
  };

  return (
    <globalContext.Provider
      value={{
        shoppingLists,
        recipes,
        deleteRecipe,
        editUnitIngredientRecipe,
        editValueIngredientRecipe,
        deleteIngredientFromRecipe,
        addIngredientToRecipe,
        fetchShoppingLists,
        addIngredientToShoppingList,
        addShoppingList,
        deleteShoppingList,
        deleteIngredientFromShoppingList,
        fetchRecipes,
        editValueIngredientShoppingList,
        editUnitIngredientShoppingList,
        addRecipeIngredientsToSL,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
