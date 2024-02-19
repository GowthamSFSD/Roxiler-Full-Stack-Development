import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import "./index.css";

const TransactionBarChart = ({ nameMonth, priceRangeDetails, loading }) => {
  const renderLoader = () => (
    <div className="bar-loading-container">
      <div className="loading-animation"></div>
    </div>
  );
  return (
    <div className="bar-container">
      <h1>
        Bar Chart Statistics: <span>{nameMonth}</span>
      </h1>
      {loading ? (
        renderLoader()
      ) : (
        <div>
          <BarChart width={550} height={350} data={priceRangeDetails}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default TransactionBarChart;
