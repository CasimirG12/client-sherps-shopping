import React from "react";
import { Ingredient } from "../types/ingredient";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { ShoppingList } from "../types/shoppingList";

interface IngredientShoppingListProps {
  item: Ingredient;
  shoppingList: ShoppingList;
}

const IngredientShoppingList: React.FC<IngredientShoppingListProps> = ({
  item,
  shoppingList,
}) => {
  const { deleteIngredientFromShoppingList } = useGlobalContext();
  return (
    <div className="border-b border-slate-800 flex flex-row justify-between p-2">
      <div className="flex flex-row gap-2 justify-center items-center">
        <p>{item.quantity}</p>
        <p>{item.name}</p>
      </div>
      <FaTrash
        onClick={() =>
          deleteIngredientFromShoppingList(shoppingList.id, item.id)
        }
      />
    </div>
  );
};

export default IngredientShoppingList;
