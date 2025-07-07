import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import toast from "react-hot-toast";

const AddExpenseForm = ({ onAddExpense }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  const handleSubmit = () => {
    // Basic validation example
    if (!income.category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!income.amount || isNaN(income.amount) || Number(income.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!income.date) {
      toast.error("Date is required");
      return;
    }
    onAddExpense({
      ...income,
      amount: Number(income.amount),
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="rent, Groceries, etc"
        type="text"
      />
      <Input
        value={income.amount} // Fixed here
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit} // Changed to use validation wrapper
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
