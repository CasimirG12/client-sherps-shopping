import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

interface IngredientStepProps {
  index: number;
  step: string;
  steps: string[];
  setSteps: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientStep: React.FC<IngredientStepProps> = ({
  index,
  step,
  steps,
  setSteps,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editedStep, setEditedStep] = useState<string>(step);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit && inputRef.current) {
      // Focus the input field when it is being edited
      inputRef.current.focus();
    }
  }, [edit]); // Trigger on edit state change

  const handleAddStep = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Update the steps array with the edited step
    const updatedSteps = [...steps];
    updatedSteps[index] = editedStep;
    setSteps(updatedSteps);
    setEdit(false); // Exit edit mode
  };

  return (
    <div
      className="border-b-2 border-b-slate-700 p-2 animate-slideDownHeight flex flex-row items-center gap-2"
      key={index}
      onClick={() => setEdit(true)} // Set edit mode when clicked
    >
      <p>Step {index + 1}:</p>
      {!edit ? (
        <p>{editedStep}</p>
      ) : (
        <div className="relative flex flex-row items-center w-full">
          <input
            type="text"
            className="w-full py-2"
            value={editedStep}
            onChange={(e) => setEditedStep(e.target.value)}
            ref={inputRef} // Assign ref to the input field
          />
          <button
            onClick={(e) => handleAddStep(e)}
            className="h-full flex items-center"
          >
            <FaCheck className="absolute right-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default IngredientStep;
