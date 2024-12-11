import React, { useState, useEffect, useRef } from "react";
import { Ingredient } from "../types/ingredient";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { ShoppingList } from "../types/shoppingList";
import UnitSelector from "./UnitSelector";

interface IngredientShoppingListProps {
  item: Ingredient;
  shoppingList: ShoppingList;
}

const IngredientShoppingList: React.FC<IngredientShoppingListProps> = ({
  item,
  shoppingList,
}) => {
  const {
    deleteIngredientFromShoppingList,
    editValueIngredientShoppingList,
    editUnitIngredientShoppingList,
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
    editValueIngredientShoppingList(shoppingListId, ingredientId, quantity);
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
        handleSubmit(shoppingList.id, item.id, Number(inputRef.current?.value));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [quantityEdit, shoppingList.id, item.id]);

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
          shoppingListId={shoppingList.id}
          ingredientId={item.id}
          editUnitIngredientLocation={editUnitIngredientShoppingList}
        />
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
