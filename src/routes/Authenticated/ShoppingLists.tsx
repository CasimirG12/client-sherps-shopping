import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import ShoppingListCard from "../../components/ShoppingListCard";
import { Outlet, useParams } from "react-router";

const ShoppingLists = () => {
  const { shoppingLists, fetchShoppingLists, addShoppingList } =
    useGlobalContext();
  const { id } = useParams();
  const [slName, setSlName] = useState<string>("");

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSlName(e.target.value);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (slName && slName.trim() !== "") {
      addShoppingList(slName);
    }
  };

  if (id) {
    return <Outlet />;
  }

  return (
    <div>
      <form
        onSubmit={(e) => handleAdd(e)}
        className="bg-slate-800 p-2 flex flex-row items-center gap-2 shadow-slate-900 shadow-md"
      >
        <input
          type="text"
          placeholder="give your shoppinglist a name..."
          value={slName}
          onChange={(e) => handleChange(e)}
          className="w-4/6 px-2 py-1 rounded-sm bg-slate-600"
        />
        <button
          type="submit"
          className="w-1/6 bg-pink-500 rounded-md text-white font-bold py-1 active:scale-95 duration-200"
        >
          add
        </button>
      </form>
      <div className="w-screen flex flex-col items-center mt-2 gap-2 relative">
        {shoppingLists.map((shoppingList) => (
          <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingLists;
