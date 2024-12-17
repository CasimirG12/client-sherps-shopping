import React from "react";
import Modal from "./Modal";

interface ModalAddIngredientProps {
  closeAddIngredientModal: () => void;
  modalAddIngredient: boolean;
  handleAddIngredient: (e: React.FormEvent) => void;
  newIngredientName: string | undefined;
  setNewIngredientName: (
    value: React.SetStateAction<string | undefined>
  ) => void;
  newIngredientQuantity: number | undefined;
  setNewIngredientQuantity: (
    value: React.SetStateAction<number | undefined>
  ) => void;
}

const ModalAddIngredient: React.FC<ModalAddIngredientProps> = ({
  closeAddIngredientModal,
  modalAddIngredient,
  handleAddIngredient,
  newIngredientName,
  setNewIngredientName,
  newIngredientQuantity,
  setNewIngredientQuantity,
}) => {
  return (
    <Modal onClose={closeAddIngredientModal} open={modalAddIngredient}>
      <form
        className="flex flex-col gap-2 bg-slate-500 p-1"
        onSubmit={(e) => handleAddIngredient(e)}
      >
        <label className="flex flex-col">
          Which ingredient would you like to add?
          <input
            type="text"
            value={newIngredientName}
            defaultValue={undefined}
            onChange={(e) => setNewIngredientName(e.target.value)}
            className="mx-1 p-2 rounded-md bg-slate-400"
          />
        </label>
        <label className="flex flex-col">
          How many/much?
          <input
            type="number"
            value={newIngredientQuantity}
            defaultValue={undefined}
            onChange={(e) => setNewIngredientQuantity(Number(e.target.value))}
            className="mx-1 p-2 rounded-md bg-slate-400"
          />
        </label>
        <button
          className="px-2 py-2 bg-yellow-500 rounded-md font-bold mx-1"
          type="submit"
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default ModalAddIngredient;
