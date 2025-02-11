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
  const [selectedUnit, setSelectedUnit] = useState<MeasureUnit>(
    currentUnit === null ? "pc." : currentUnit
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const units: MeasureUnit[] = ["pc.", "g", "kg", "ml", "l"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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
    <div className="relative text-gray-200" ref={dropdownRef}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={`cursor-pointer rounded flex items-center justify-center p-2 ${
          open ? "bg-gray-500 border" : ""
        }`}
      >
        {selectedUnit}
      </div>
      <div
        className={`absolute top-10 text-black bg-white border z-10 rounded shadow-lg overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 max-h-60" : "opacity-0 max-h-0"
        }`}
      >
        {units.map(
          (unit) =>
            unit !== selectedUnit && (
              <div
                key={unit}
                onClick={() =>
                  handleUnitSelect(shoppingListId, ingredientId, unit)
                }
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {unit}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UnitSelector;
