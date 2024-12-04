import { Ingredient } from "./ingredient";

export interface Recipe {
  id: number;
  name: string;
  dateCreated: Date;
  ingredients: Ingredient[];
}