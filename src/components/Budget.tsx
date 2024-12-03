import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import { FaMoneyBill1Wave } from "react-icons/fa6";

interface BudgetProps {
  leftOverBudget: number;
}

const Budget: React.FC<BudgetProps> = ({ leftOverBudget }) => {
  const { budget, setNewBudget, fetchBudget } = useGlobalContext();

  const [localBudget, setLocalBudget] = useState(0);

  const onBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalBudget(Number(value));
  };

  const onBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewBudget(localBudget);
  };

  useEffect(() => {
    fetchBudget();
  }, [budget]);

  // Format the budgets as euro currency
  const formattedLeftOverBudget = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(leftOverBudget);

  const formattedTotalBudget = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(budget);

  return (
    <div className="my-2 flex flex-wrap gap-3 text-white items-center">
      <form
        onSubmit={(event) => onBudgetSubmit(event)}
        className="flex flex-row gap-2"
      >
        <input
          type="number"
          placeholder="Budget"
          value={localBudget}
          name="budget"
          onChange={onBudgetChange}
          className="px-2 py-1 text-black"
        />
        <button
          type="submit"
          className="bg-yellow-300 flex flex-row gap-2 px-2 py-1 items-center rounded-md text-slate-700"
        >
          <FaMoneyBill1Wave />
          Set Budget
        </button>
      </form>
      <div>Leftover Budget: {formattedLeftOverBudget}</div>
      <div>Total Budget: {formattedTotalBudget}</div>
    </div>
  );
};

export default Budget;
