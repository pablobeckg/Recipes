import "./RecipeDetailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabaseClient from "../../lib/supabaseClient";
import { useUserContext } from "../../context/UserContext";
import {
  Ingredients,
  RecipeWithFavorite,
} from "../../types/supabase-types-own";
import { FaRegStar, FaStar } from "react-icons/fa";

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeWithFavorite | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const userContext = useUserContext();
  const user = userContext?.user;

  if (!user) {
    return;
  }

  useEffect(() => {
    const fetchSingleRecipe = async () => {
      if (!id) {
        console.error("No recipe id given.");
        return;
      }

      let selectQuery = supabaseClient
        .from("recipes")
        .select("*, ingredients(*), recipe_favorites(recipe_id)")
        .eq("id", id)
        .single();

      const result = await selectQuery;

      if (result.error) {
        console.error("Recipe not found in database");
        setRecipe(null);
      }
      if (result.data) {
        console.log(result.data);
        setRecipe(result.data);
      }
    };
    fetchSingleRecipe();
  }, [id, refresh]);

  if (!recipe) {
    return <p>No result</p>;
  }
  const selectedRecipe = recipe.recipe_favorites;
  const isFavorite = selectedRecipe.some((fav: { recipe_id: string; }) => fav.recipe_id === recipe.id);

  const addFavorite = async (recipeId: string) => {
    if (!selectedRecipe) {
      return;
    }
    const isFavorite = selectedRecipe.some((fav: { recipe_id: string; }) => fav.recipe_id === recipeId);
    if (!isFavorite) {
      const favoriteRecipeResponse = await supabaseClient
        .from("recipe_favorites")
        .insert({ recipe_id: recipe.id })
        .eq("recipe_id", recipeId)
        .eq("user_id", user.id);

      if (favoriteRecipeResponse.error) {
        console.error(
          "Favorite recipe could not be saved",
          favoriteRecipeResponse.error
        );
      } else {
        console.log("Favorite recipe successfully saved");
        setRefresh((prev) => !prev);
      }
    }
  };

  const deleteFavorite = async (recipeId: string) => {
    if (!selectedRecipe) {
      return;
    }

    if (isFavorite) {
      const supabaseDeleteResponse = await supabaseClient
        .from("recipe_favorites")
        .delete()
        .eq("recipe_id", recipeId)
        .eq("user_id", user.id);

      if (supabaseDeleteResponse.error) {
        console.error("Error deleting favorite", supabaseDeleteResponse.error);
      } else {
        console.log("Previous favorite recipe successfully deleted");
        setRefresh((prev) => !prev);
      }
    }
  };

  return (
    <>
      <section
        className="recipe-image-container"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      >
        <div className="image-black-overlay">
          <h1>{recipe.name}</h1>
        </div>
      </section>
      <main className="recipe-information">
        <h2>Zutaten</h2>
        <ul>
          {recipe.ingredients.map((ingredient: Ingredients) => (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>

        <h2>Zubereitung</h2>
        <p>{recipe.instructions}</p>

        <h2>Zusätzliche Informationen</h2>
        <p>{recipe.description}</p>
        <div className="quiz-favorite-icon">
          {recipe.recipe_favorites.find(
            (favorite: { recipe_id: any; }) => favorite.recipe_id === recipe.id
          ) ? (
            <FaStar onClick={() => deleteFavorite(recipe.id)} />
          ) : (
            <FaRegStar onClick={() => addFavorite(recipe.id)} />
          )}
        </div>
      </main>
    </>
  );
};

export default RecipeDetailPage;
