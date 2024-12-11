import { Ingredient } from "./ingredient";

export interface Recipe {
  id: number;
  name: string;
  dateCreated: string;
  username: string;
  ingredients: Ingredient[];
  description: string;
}