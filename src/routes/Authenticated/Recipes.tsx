import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { useGlobalContext } from "../../context/globalContext";
import RecipeCard from "../../components/RecipeCard";

const Recipes: React.FC = () => {
  const { id } = useParams();
  const { recipes, fetchRecipes } = useGlobalContext();

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (id) {
    return <Outlet />;
  }
  return (
    <div>
      <div className="flex flex-col mt-4 gap-4 items-center w-screen">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={`re-${recipe.id}`} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
