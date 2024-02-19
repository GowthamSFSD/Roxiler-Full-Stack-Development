import React from "react";
import { PieChart, Pie } from "recharts";

import "./index.css";

const TransactionPieChart = ({ nameMonth, categoryDetails, loading }) => {
  const renderLoader = () => (
    <div className="pie-loading-container">
      <div className="loading-animation"></div>
    </div>
  );
  return (
    <div className="pie-container">
      <h1>
        Pie Chart Statistics: <span>{nameMonth}</span>
      </h1>
      {loading ? (
        renderLoader()
      ) : (
        <PieChart width={730} height={450}>
          <Pie
            data={categoryDetails}
            dataKey="itemCount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={150}
            fill="#82ca9d"
            label
          />
          <Pie
            data={categoryDetails}
            dataKey="itemCount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
        </PieChart>
      )}
    </div>
  );
};

export default TransactionPieChart;
