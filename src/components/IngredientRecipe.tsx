import React, { useState, useEffect, useRef } from "react";
import { Ingredient } from "../types/ingredient";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import UnitSelector from "./UnitSelector";
import { Recipe } from "../types/recipe";

interface IngredientRecipeProps {
  item: Ingredient;
  recipe: Recipe;
}

const IngredientRecipe: React.FC<IngredientRecipeProps> = ({
  item,
  recipe,
}) => {
  const {
    editUnitIngredientRecipe,
    editValueIngredientRecipe,
    deleteIngredientFromRecipe,
  } = useGlobalContext();
  const [quantityEdit, setQuantityEdit] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close and submit form when clicking outside
  const handleSubmit = (
    shoppingListId: number,
    ingredientId: number,
    quantity: number
  ) => {
    editValueIngredientRecipe(shoppingListId, ingredientId, quantity);
    setQuantityEdit(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quantityEdit &&
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        console.log(inputRef.current);
        handleSubmit(recipe.id, item.id, Number(inputRef.current?.value));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [quantityEdit, recipe.id, item.id]);

  useEffect(() => {
    if (quantityEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Optional: auto-select text on focus
    }
  }, [quantityEdit]);

  return (
    <div className="border-b border-slate-800 flex flex-row justify-between items-center p-2">
      <div className="flex flex-row gap-2 justify-center items-center">
        {!quantityEdit ? (
          <p
            onClick={() => setQuantityEdit(true)}
            className="hover:cursor-pointer"
          >
            {item.quantity}
          </p>
        ) : (
          <form ref={formRef}>
            <input
              ref={inputRef}
              type="number"
              className="w-10 pl-1"
              value={inputRef.current?.value}
            />
          </form>
        )}
        <UnitSelector
          currentUnit={item.unit}
          shoppingListId={recipe.id}
          ingredientId={item.id}
          editUnitIngredientLocation={editUnitIngredientRecipe}
        />
        <p>{item.name}</p>
      </div>
      <FaTrash onClick={() => deleteIngredientFromRecipe(recipe.id, item.id)} />
    </div>
  );
};

export default IngredientRecipe;