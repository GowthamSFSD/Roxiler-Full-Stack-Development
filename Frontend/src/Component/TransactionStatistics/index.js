import React from "react";
import "./index.css";

const TransactionStatistics = ({ nameMonth, salesDetails, loading }) => {
  const amount = Math.ceil(salesDetails.totalAmountOfSale);
  const renderLoader = () => (
    <div className="statistics-loading-container">
      <div className="loading-animation"></div>
    </div>
  );
  return (
    <div className="statistics-container">
      <div className="responsive-state">
        <h1 className="heading-transaction-state">
          Transaction statistics : <span>{nameMonth}</span>
        </h1>
        {loading ? (
          renderLoader()
        ) : (
          <div className="state-content">
            <h1 className="sales">Total Sales Amount: {amount}</h1>
            <h1 className="sales">
              Total Sold Items: {salesDetails.totalSoldItems}
            </h1>
            <h1 className="sales">
              Total Not Sold Items: {salesDetails.totalUnsoldItems}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionStatistics;
