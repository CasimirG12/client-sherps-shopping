import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate, useParams } from "react-router";
import { Recipe } from "../../types/recipe";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import IngredientStep from "../../components/IngredientStep";
import IngredientRecipe from "../../components/IngredientRecipe";
import Modal from "../../components/Modal";

const RecipeDetail = () => {
  const { recipes } = useGlobalContext();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [steps, setSteps] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const filteredRecipes = recipes.find(
      (recipe) => recipe.id === parseInt(id, 10)
    );
    setRecipe(filteredRecipes);
    const updatedSteps = filteredRecipes?.description
      .split("$%>step<%$")
      .filter((step) => step !== "");
    setSteps(updatedSteps ? updatedSteps : []);
  }, [id, recipes]);

  const addStep = () => {
    const updatedSteps = [...steps, ""];
    setSteps(updatedSteps);
  };

  const [modalAddIngredient, setModalAddIngredient] = useState<boolean>(false);

  const closeModal = () => {
    setModalAddIngredient(false);
  };

  return (
    <>
      {recipe && (
        <div>
          <div className="w-full bg-slate-800 p-2 flex flex-col item-center">
            <div className="flex flex-row items-center text-white gap-2">
              <FaArrowLeft
                size={20}
                className="hover:cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <p className="font-bold text-2xl">{recipe.name}</p>
            </div>
            <p className="text-gray-500">created on: {recipe.dateCreated}</p>
            <p className="text-gray-500">created by: {recipe.username}</p>
          </div>
          <div>
            <div className="bg-slate-700 p-2 font-bold text-white">
              <p>Ingredients</p>
              <button onClick={() => setModalAddIngredient(true)}>
                <FaPlus />
              </button>
            </div>
            <div>
              {recipe.ingredients.map((ingredient) => {
                return <IngredientRecipe item={ingredient} recipe={recipe} />;
              })}
            </div>
          </div>
          <div>
            <div className="bg-slate-700 p-2 font-bold text-white flex flex-row gap-2 items-center">
              <p>Description</p>
              <button onClick={() => addStep()}>
                <FaPlus />
              </button>
            </div>
            <div>
              {steps.map((step, index) => (
                <IngredientStep
                  step={step}
                  index={index}
                  steps={steps}
                  setSteps={setSteps}
                  key={`st-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {modalAddIngredient && (
        <Modal onClose={closeModal} open={modalAddIngredient}>
          <form className="flex flex-col items-center justify-center">
            <label>
              Which ingredient would you like to add?
              <input type="text" />
            </label>
            <button>Add</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default RecipeDetail;
