import React from "react";
import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { deleteRecipe } = useGlobalContext();

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="active:scale-95 flex flex-row items-center justify-between duration-200 w-11/12  bg-slate-500 p-4 rounded-md shadow-black shadow-sm hover:cursor-pointer"
    >
      <p>
        {recipe.name} created by {recipe.username}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteRecipe(recipe.id);
        }}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default RecipeCard;
