import { Ingredient } from "./ingredient";

export interface ShoppingList {
  id: number;
  name: string;
  username: string;
  dateCreated: Date;
  ingredients: Ingredient[];
}