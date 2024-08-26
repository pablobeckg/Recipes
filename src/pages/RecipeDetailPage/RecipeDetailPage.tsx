import "./RecipeDetailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeComplete } from "../../types/supabase-types-own";
import supabaseClient from "../../lib/supabaseClient";
import { useUserContext } from "../../context/UserContext";
const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeComplete | null>(null);
  const userContext = useUserContext();
  const user = userContext?.user;

  useEffect(() => {
    const fetchSingleRecipe = async () => {
      if (!id) {
        console.error("No recipe id given.");
        return;
      }

      const supabaseResponse = await supabaseClient
        .from("recipes")
        .select(
          `
            category_id,
            created_at,
            description,
            id,
            imageUrl,
            instructions,
            name,
            rating,
            servings,
            ingredients (
                additionalInfo,
                created_at,
                id,
                name,
                quantity,
                recipe_id,
                unit
            )
            `
        )
        .eq("id", id)
        .single();
      if (supabaseResponse.error) {
        console.error("Recipe not found in database");
        return;
      }
      if (supabaseResponse.data) {
        setRecipe(supabaseResponse.data);
        console.log(supabaseResponse.data);
      }
    };
    fetchSingleRecipe();
  }, [id]);

  if (!user) {
    console.error("User not found");
    return;
  }

  if (!recipe) {
    return <p>No result</p>;
  }

  const handleFavorite = () => {
    submitResultToSupabase(recipe.id) ;
  };

  const submitResultToSupabase = async (id: string) => {
    const deletePreviousFavoriteRecipeResponse = await supabaseClient
      .from("recipe_favorites")
      .delete()
      .eq("recipe_id", recipe.id)
      .eq("user_id", user.id);
    if (deletePreviousFavoriteRecipeResponse.error) {
      console.error(
        "Error deleting favorite recipe",
        deletePreviousFavoriteRecipeResponse.error
      );
    } else {
      console.log("Previous favorite recipe successfully deleted");
    }

    const favoriteRecipeResponse = await supabaseClient
      .from('recipe_favorites')

      .insert({ recipe_id: id});

    if (favoriteRecipeResponse.error) {
      console.error('Favorite recipe could not be saved', favoriteRecipeResponse.error);
    } else {
      console.log('Favorite recipe successfully saved');
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
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>

        <h2>Zubereitung</h2>
        <p>{recipe.instructions}</p>

        <h2>Zusätzliche Informationen</h2>
        <p>{recipe.description}</p>
        <button onClick={handleFavorite}>Add to favorites</button>
      </main>
    </>
  );
};

export default RecipeDetailPage;
