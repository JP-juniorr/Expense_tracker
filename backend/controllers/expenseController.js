//const User = require("../models/userModel");
const Expense = require("../models/Expense"); // Ensure this path is correct
const xlsx = require("xlsx");
// Ensure this path is correct
exports.addExpense = async (req, res) => {
  const userId = req.user?.id; // Ensure req.user exists
  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    const { icon = "", category, amount, date } = req.body;

    console.log("Request Body:", req.body); // Debugging log

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount: Math.abs(amount),
      date: new Date(date),
      amount: Math.abs(amount),
    });

    console.log("New Expense:", newExpense); // Debugging log

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error.message); // Debugging log
    res.status(500).json({
      message: "Error adding expense",
      error: error.message,
    });
  }
};
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Expense",
      error: error.message,
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // Ensure the expense belongs to the authenticated user
    });
    console.log("Expense ID:", req.params.id);
    console.log("User ID:", req.user.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
      error: error.message,
    });
  }
};
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    const data = expense.map((item) => ({
      category: item.category,
      amount: item.amount,
      Date: item.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error downloading expense data",
      error: error.message,
    });
  }
};
