import React from "react";
import { ShoppingList } from "../types/shoppingList";
import { FaShoppingBasket, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../context/globalContext";

interface ShoppingListCardProps {
  shoppingList: ShoppingList;
}

const ShoppingListCard: React.FC<ShoppingListCardProps> = ({
  shoppingList,
}) => {
  const navigate = useNavigate();
  const { deleteShoppingList } = useGlobalContext();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteShoppingList(shoppingList.id);
  };

  return (
    <button
      className="w-11/12 py-4 px-2 bg-slate-500 rounded-md flex flex-row items-center justify-between shadow-md shadow-gray-800 gap-2 active:scale-95 active:shadow-sm duration-200 font-bold"
      onClick={() => navigate(`/shopping-lists/${shoppingList.id}`)}
    >
      <div className="flex flex-row gap-2 items-center">
        <FaShoppingBasket size={25} className="text-white" />
        {shoppingList.name}
      </div>
      <button onClick={(e) => handleDelete(e)}>
        <FaTrash size={25} className="text-red-500" />
      </button>
    </button>
  );
};

export default ShoppingListCard;
