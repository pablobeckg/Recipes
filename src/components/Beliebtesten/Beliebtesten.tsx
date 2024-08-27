import { useEffect, useState } from "react";
import "./Beliebtesten.css";
import supabaseClient from "../../lib/supabaseClient";
import { useSearchTermContext } from "../../context/SearchTermContext";
import { Recipe } from "../../types/supabase-types-own";
import { Link } from "react-router-dom";

const Beliebtesten = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { searchTerm } = useSearchTermContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      let selectQuery = supabaseClient
        .from("recipes")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);

      if (searchTerm) {
        selectQuery = selectQuery.ilike("name", `%${searchTerm}%`);
      }
      const result = await selectQuery;
      if (result.error) {
        console.error(result.error);
        setRecipes([]);
      } else {
        setRecipes(result.data);
      }
    };
    fetchRecipes();
  }, [searchTerm]);


  return (
    <section className="beliebtesten-recipes">
      {!searchTerm && <h1>Die beliebtesten Rezepte</h1>}
      <div className="beliebtesten-list">
        {!recipes && <p>Loading...</p>}
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe) => (
            <article
              key={recipe.id}
              className={`beliebtesten-list-item ${recipe.name}`}
            >
              <div
                className="beliebtesten-image"
                style={{ backgroundImage: `url(${recipe.imageUrl})` }}
              ></div>
              <div className="beliebtesten-information">
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <Link to={`/rezepte/${recipe.id}`}>
                  <button>Zum rezept</button>
                </Link>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Beliebtesten;
