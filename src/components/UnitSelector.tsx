import React, { useState, useEffect, useRef } from "react";
import { MeasureUnit } from "../types/ingredient";

interface UnitSelectorProps {
  currentUnit?: MeasureUnit;
  shoppingListId: number;
  ingredientId: number;
  editUnitIngredientLocation: (
    locationId: number,
    ingredientId: number,
    unit: MeasureUnit
  ) => Promise<void>;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  currentUnit = "pc.",
  shoppingListId,
  ingredientId,
  editUnitIngredientLocation,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<MeasureUnit>(
    currentUnit === null ? "pc." : currentUnit
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const units: MeasureUnit[] = ["pc.", "g", "kg", "ml", "l"];

  useEffect(() => {
    setReady(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUnitSelect = (
    shoppingListId: number,
    ingredientId: number,
    unit: MeasureUnit
  ) => {
    setSelectedUnit(unit);
    editUnitIngredientLocation(shoppingListId, ingredientId, unit);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={`cursor-pointer rounded flex items-center justify-center p-2 ${
          open ? "bg-gray-500 border" : ""
        }`}
      >
        {selectedUnit}
      </div>
      <div
        className={`${
          ready
            ? open
              ? "animate-slideDownHeight opacity-100 visibility-visible"
              : "animate-slideUpHeight opacity-0 visibility-hidden"
            : "opacity-0 visibility-hidden"
        } absolute top-10 bg-white border z-10 rounded shadow-lg overflow-hidden`}
        style={{ maxHeight: open ? "200px" : "0px" }} // Control the height during the animation
      >
        {units.map((unit) => (
          <div
            key={unit}
            onClick={() => {
              handleUnitSelect(shoppingListId, ingredientId, unit);
            }}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {unit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitSelector;
