import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { useGlobalContext } from "../../context/globalContext";
import RecipeCard from "../../components/RecipeCard";
import { useAuthContext } from "../../context/authContext";
import AnimatedButton from "../../components/AnimatedButton";

const Recipes: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { recipes, fetchRecipes, postRecipe } = useGlobalContext();
  const [recipeName, setRecipeName] = useState<string>("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipeName === "") return;
    if (!user) return;
    await postRecipe(recipeName, user.id);
    setRecipeName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRecipeName(e.target.value);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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
          placeholder="give your recipe a name..."
          value={recipeName}
          onChange={(e) => handleChange(e)}
          className="w-4/6 px-2 py-1 rounded-sm bg-slate-600"
        />
        <AnimatedButton
          type="submit"
          className="w-20 bg-yellow-400 rounded-full font-bold py-1 active:scale-95 duration-200"
        >
          add
        </AnimatedButton>
      </form>
      <div className="flex flex-col mt-4 gap-4 items-center w-screen">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={`re-${recipe.id}`} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
