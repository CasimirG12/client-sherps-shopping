import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate, useParams } from "react-router";
import { ShoppingList } from "../../types/shoppingList";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import Modal from "../../components/Modal";
import IngredientShoppingList from "../../components/IngredientShoppingList";

const ShoppingListDetail = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingList | undefined>(
    undefined
  );
  const [filteredIngredients, setFilteredIngredients] = useState<
    ShoppingList["ingredients"]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<undefined | number>(undefined);
  const { shoppingLists, addIngredientToShoppingList } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const onClose = () => {
    setModalOpen(false);
  };

  const onOpen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm || searchTerm.trim() === "") {
      return;
    }
    setModalOpen(true);
  };

  useEffect(() => {
    if (!id) return;

    if (shoppingLists.length) {
      const shoppingList = shoppingLists.find(
        (shoppingList) => shoppingList.id === Number(id)
      );
      setShoppingList(shoppingList);

      // Initialize filtered ingredients to the full list of ingredients
      if (shoppingList) {
        setFilteredIngredients(shoppingList.ingredients);
      }
    }
  }, [id, shoppingLists]);

  // Debounce search term updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() && shoppingList) {
        const updatedIngredients = shoppingList.ingredients.filter(
          (ingredient) =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredIngredients(updatedIngredients);
      } else if (shoppingList) {
        setFilteredIngredients(shoppingList.ingredients);
      }
    }, 500);

    return () => clearTimeout(timer); // Cleanup timeout on unmount or before re-running
  }, [searchTerm, shoppingList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (shoppingList) {
      addIngredientToShoppingList(
        shoppingList.id,
        searchTerm,
        quantity ? quantity : 1
      );
    }
    setSearchTerm("");
    setModalOpen(false);
    setQuantity(undefined);
  };

  return (
    <div className="w-screen">
      {shoppingList && (
        <>
          <div className="flex flex-row bg-slate-800 w-full pl-4 py-2 items-center gap-2">
            <button onClick={() => navigate(-1)} className="h-full">
              <FaArrowLeft size={20} color="white" />
            </button>
            <div className="flex flex-col gap-2 justify-center w-full">
              <div className="flex flex-col text-white">
                <p className="font-bold text-xl">{shoppingList.name}</p>
                <p>{shoppingList.username}</p>
              </div>
              <form
                onSubmit={(e) => onOpen(e)}
                className="flex flex-row gap-2 items-center justify-center"
              >
                <input
                  name="searchparam"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search for item..."
                  className="bg-slate-700 text-white w-10/12 p-2 rounded-md"
                />
                <button type="submit">
                  <FaPlus color="white" />
                </button>
              </form>
            </div>
          </div>
          <div>
            {filteredIngredients.map((item) => (
              <IngredientShoppingList
                key={`item-${item.id}`}
                item={item}
                shoppingList={shoppingList}
              />
            ))}
          </div>
        </>
      )}
      <Modal open={modalOpen} onClose={onClose}>
        <div className="flex flex-col justify-center items-center gap-2">
          <p>How many?</p>
          <form
            onSubmit={(e) => handleAddIngredient(e)}
            className="flex flex-wrap w-full gap-2"
          >
            <input
              type="number"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              value={quantity}
              className="bg-slate-300 rounded-sm"
            />
            <button
              type="submit"
              className="bg-slate-600 rounded-sm px-2 text-white font-bold"
            >
              add
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingListDetail;
