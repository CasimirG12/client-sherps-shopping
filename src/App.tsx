import { useState, useEffect } from "react";
import AddItemBar from "./components/AddItemBar";
import Budget from "./components/Budget";
import ItemCard from "./components/ItemCard";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const { items, calcLeftOverBudget } = useGlobalContext();
  const [leftOverBudget, setLeftOverBudget] = useState(0);

  useEffect(() => {
    console.log("Items changed:", items); // Log to see if items are updated correctly
    setLeftOverBudget(calcLeftOverBudget());
  }, [items]);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 h-screen w-screen overflow-hidden">
      <AddItemBar />
      <div className="ml-4 h-4/6">
        <Budget leftOverBudget={leftOverBudget} />
        <div className="flex flex-col gap-2 w-11/12 h-full lg:w-1/2 overflow-y-scroll">
          {items.length > 0 ? (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <p className="text-white">No items added yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
