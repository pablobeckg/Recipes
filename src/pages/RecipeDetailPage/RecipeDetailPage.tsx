import "./RecipeDetailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeComplete } from "../../types/supabase-types-own";
import supabaseClient from "../../lib/supabaseClient";
const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeComplete | null>(null);
  console.log(id);
  useEffect(() => {
    const fetchSingleRecipe = async () => {
      if (!id) {
        console.error("No quiz id given.");
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

  if (!recipe) {
    return <p>No result</p>;
  }
  return (
    <>
      <section
        className="recipe-image-container"
        style={{ backgroundImage: `url(${recipe.imageUrl})` }}
      >
        <div className="image-black-overlay">
          <h1>
        {recipe.name}
          </h1>
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

        <h3>Zusätzliche Informationen</h3>
        <p>{recipe.description}</p>
      </main>
    </>
  );
};

export default RecipeDetailPage;
