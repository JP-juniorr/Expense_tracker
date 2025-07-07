//const User = require("../models/userModel");
const Income = require("../models/Income"); // Ensure this path is correct
const xlsx = require("xlsx");
exports.addIncome = async (req, res) => {
  console.log("Request body:", req.body); // Add this line to debug
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({
      message: "Error adding income",
      error: error.message,
    });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching incomes",
      error: error.message,
    });
  }
};
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findOneAndDelete(req.user.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting income",
      error: error.message,
    });
  }
};
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    const data = income.map((item) => ({
      source: item.source,
      amount: item.amount,
      Date: item.date,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error downloading income data",
      error: error.message,
    });
  }
};
