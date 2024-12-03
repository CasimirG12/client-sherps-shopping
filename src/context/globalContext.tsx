import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { Item } from "../types/item";

export type GlobalContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  items: Item[];
  fetchItems: () => void;
  deleteItem: (id: number) => void;
  addItem: (item: Item) => void;
  calcLeftOverBudget: () => number;
  setNewBudget: (budget: number) => void;
  budget: number;
  fetchBudget: () => void;
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
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState<Item[]>([]);
  const [budget, setBudget] = useState(0);

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const setNewBudget = async (budget: number) => {
    setBudget(budget);
    try {
      const response = await fetch("http://localhost:5000/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget }),
      });

      if (!response.ok) {
        throw new Error("Failed to set new budget");
      }
    } catch (error) {
      console.error("Error setting new budget:", error);
    }
  };

  const calcLeftOverBudget = () => {
    return budget - calculateTotal();
  };

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/items"); // Backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems(data); // Set items from the backend
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Delete an item and update the backend
  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Remove item from local state if deletion was successful
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const addItem = async (item: Item) => {
    try {
      // Optimistic UI update: add item to local state immediately
      setItems((prevItems) => [...prevItems, item]);

      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/budget");
      if (!response.ok) {
        throw new Error("Failed to fetch budget");
      }
      const data = await response.json();
      setBudget(data.budget);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  // Fetch items when the component mounts
  useEffect(() => {
    console.log("Fetching items...");
    fetchItems();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <globalContext.Provider
      value={{
        theme,
        setTheme,
        items,
        fetchItems,
        deleteItem,
        addItem,
        calcLeftOverBudget,
        setNewBudget,
        budget,
        fetchBudget,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
