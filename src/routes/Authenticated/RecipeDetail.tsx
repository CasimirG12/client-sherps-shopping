import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate, useParams } from "react-router";
import { Recipe } from "../../types/recipe";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import IngredientStep from "../../components/IngredientStep";
import IngredientRecipe from "../../components/IngredientRecipe";
import Modal from "../../components/Modal";
import ModalAddIngredient from "../../components/ModalAddIngredient";
import LikeCounter from "../../components/LikeCounter";
import { FaFloppyDisk } from "react-icons/fa6";

const RecipeDetail = () => {
  const { recipes, addIngredientToRecipe, addRecipeIngredientsToSL } =
    useGlobalContext();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  const [steps, setSteps] = useState<string[]>([]);
  const [stepsChanged, setStepsChanged] = useState<boolean>(false);

  const navigate = useNavigate();
  const [newIngredientName, setNewIngredientName] = useState<
    string | undefined
  >(undefined);
  const [newIngredientQuantity, setNewIngredientQuantity] = useState<
    number | undefined
  >(undefined);
  const [modalAddIngredient, setModalAddIngredient] = useState<boolean>(false);
  const [modalAddToSL, setModalAddToSL] = useState<boolean>(false);

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

  const closeAddIngredientModal = () => {
    setModalAddIngredient(false);
    setNewIngredientName(undefined);
    setNewIngredientQuantity(undefined);
  };

  const closeAddToSLModal = () => {
    setModalAddToSL(false);
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe && newIngredientName && newIngredientQuantity) {
      addIngredientToRecipe(
        recipe.id,
        newIngredientName,
        newIngredientQuantity
      );
      closeAddIngredientModal();
      return;
    }
    return;
  };

  return (
    <>
      {recipe && (
        <>
          <div className="w-full h-[15vh] bg-slate-800 p-2 flex flex-col item-center justify-evenly">
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
            <LikeCounter recipeId={recipe.id} />
          </div>
          <div className="h-[35vh]">
            <div className="bg-slate-700 p-2 font-bold text-white flex flex-row gap-2 h-[6vh] items-center">
              <p>Ingredients</p>
              <button onClick={() => setModalAddIngredient(true)}>
                <FaPlus />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[29vh]">
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <IngredientRecipe
                    item={ingredient}
                    recipe={recipe}
                    key={`ing-${index}`}
                  />
                );
              })}
            </div>
          </div>
          <div className="h-[35vh]">
            <div className="bg-slate-700 p-2 font-bold text-white flex flex-row gap-2 items-center h-[6vh]">
              <p>Description</p>
              <button onClick={() => addStep()}>
                <FaPlus />
              </button>
              <button disabled={!stepsChanged} className="disabled:opacity-20">
                <FaFloppyDisk />
              </button>
            </div>
            <div className="h-[29vh] overflow-y-auto">
              {steps.map((step, index) => (
                <IngredientStep
                  step={step}
                  index={index}
                  steps={steps}
                  setSteps={setSteps}
                  stepsChanged={stepsChanged}
                  setStepsChanged={setStepsChanged}
                  key={`st-${index}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center h-[10vh] bg-slate-700">
            <button
              className="bg-yellow-400 w-[95vw] py-4 rounded-md font-bold shadow-md shadow-slate-800 text-lg active:scale-95 active:opacity-80 duration-200"
              onClick={() => setModalAddToSL(true)}
            >
              Add to Shopping List
            </button>
          </div>
        </>
      )}
      {modalAddIngredient && (
        <ModalAddIngredient
          closeAddIngredientModal={closeAddIngredientModal}
          modalAddIngredient={modalAddIngredient}
          handleAddIngredient={handleAddIngredient}
          newIngredientName={newIngredientName}
          setNewIngredientName={setNewIngredientName}
          newIngredientQuantity={newIngredientQuantity}
          setNewIngredientQuantity={setNewIngredientQuantity}
        />
      )}
      {modalAddToSL && (
        <Modal onClose={closeAddToSLModal} open={modalAddToSL}>
          <form
            onSubmit={() => {
              if (recipe) addRecipeIngredientsToSL(recipe.id, 16);
            }}
          >
            <button type="submit">Add Ingredients</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default RecipeDetail;
