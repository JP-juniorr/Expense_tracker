import React from "react";
//import CustomPieChart from "../Charts/CustomPieChart";
import CustomPieChart from "../Charts/CustomPieChart";
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balancedData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex item-center justify-between">
        <h1 className="">Financial Overview</h1>
      </div>
      <CustomPieChart
        data={balancedData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showtextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
