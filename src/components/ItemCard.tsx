import React from "react";
import { Item } from "../types/item";
import { useGlobalContext } from "../context/globalContext";
import { FaTrashAlt } from "react-icons/fa";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { name, price, quantity } = item;
  const { deleteItem } = useGlobalContext();

  // Format the price as euro currency
  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return (
    <div className="flex flex-row items-center bg-slate-300 rounded-md px-4 py-2 shadow-md justify-between">
      <div className="flex flex-row items-center gap-4">
        <div>Name: {name}</div>
        <div>Price: {formattedPrice}</div>
        <div>Quantity: {quantity}</div>
      </div>
      <button
        onClick={() => deleteItem(item.id)}
        className="bg-red-500 rounded-md px-2 py-1 text-white"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default ItemCard;
