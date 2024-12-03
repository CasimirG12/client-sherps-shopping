import React, { useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import { Item } from "../types/item";

const AddItemBar = () => {
  const [itemToAdd, setItemToAdd] = useState({
    name: "",
    price: 0,
    quantity: 0,
  } as Item);

  const { addItem } = useGlobalContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemToAdd({
      ...itemToAdd,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (itemToAdd.name && itemToAdd.price && itemToAdd.quantity) {
      addItem(itemToAdd);
      setItemToAdd({ name: "", price: 0, quantity: 0 } as Item); // Reset the form after adding the item
    } else {
      // Handle form validation error (can show a toast, alert, etc.)
      alert("Please fill out all fields");
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="bg-slate-500 shadow-md flex p-4 gap-2 items-center w-screen flex-wrap lg:flex-row"
    >
      <label>
        Name:
        <input
          type="text"
          placeholder="Name"
          value={itemToAdd.name}
          name="name"
          onChange={onChange}
          className="px-2 py-1 ml-2"
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          placeholder="Price"
          value={itemToAdd.price}
          name="price"
          onChange={onChange}
          className="px-2 py-1 ml-2"
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          placeholder="Quantity"
          value={itemToAdd.quantity}
          name="quantity"
          onChange={onChange}
          className="px-2 py-1 ml-2"
        />
      </label>
      <button
        type="submit"
        className="bg-slate-600 rounded-md text-white p-2 active:scale-90 duration-200"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemBar;
