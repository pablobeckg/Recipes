import { Tables } from "./supabase-types-gen";

export type Recipe = Tables<'recipes'>
export type Ingredients = Tables<'ingredients'>
export type Categories = Tables<'categories'>

export type RecipeComplete = Recipe & { ingredients: Ingredients[] }
