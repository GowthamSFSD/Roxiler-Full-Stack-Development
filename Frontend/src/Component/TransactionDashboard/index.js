import React, { useEffect, useState } from "react";
import Header from "../Header";
import TransactionStatistics from "../TransactionStatistics";
import TransactionBarChart from "../TransactionBarChat";
import TransactionPieChart from "../TransactionPieChart";
import ProductItems from "../ProductItems";

import "./index.css";

const TransactionDashboard = () => {
  const [month, setMonth] = useState("03");
  const [nameMonth, setNameMonth] = useState("March");
  const [products, setProducts] = useState([]);
  const [salesDetails, setSalesDetails] = useState([]);
  const [priceRangeDetails, setPriceRangeDetails] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [controlLimit, setControlLimit] = useState(5);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getSalesDetails(month);
    getProduct(month);
    getPriceRangeDetails(month);
    getcategoryDetails(month);
    setNameMonth(getMonthName(month));
  }, [month]);

  const onChangeMonth = async (e) => {
    setLoading(true);
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    getProduct(selectedMonth);
    getSalesDetails(selectedMonth);
    getPriceRangeDetails(selectedMonth);
    setNameMonth(getMonthName(selectedMonth));
  };

  const getProduct = async (month) => {
    try {
      const response = await fetch(
        `https://gowtham-roxiler.up.railway.app/transactions-details?month=${month}`
      );
      const data = await response.json();
      setLoading(false);
      setOriginalProducts(data);
      let updatedProduct = data.slice(offset, limit);
      setProducts(updatedProduct);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const getSalesDetails = async (month) => {
    try {
      const response = await fetch(
        `https://gowtham-roxiler.up.railway.app/sales-details?month=${month}`
      );
      const data = await response.json();
      console.log(data.totalAmountOfSale);
      setSalesDetails(data[0]);
    } catch (e) {
      console.log("Error fetching data :", e.message);
    }
  };

  const getPriceRangeDetails = async (month) => {
    try {
      const response = await fetch(
        `https://gowtham-roxiler.up.railway.app/price-range?month=${month}`
      );
      const data = await response.json();
      setPriceRangeDetails(data);
    } catch (e) {
      console.log("Error fetching data :", e.message);
    }
  };

  const getcategoryDetails = async (month) => {
    try {
      const response = await fetch(
        `https://gowtham-roxiler.up.railway.app/category-statistics?month=${month}`
      );

      const data = await response.json();
      setCategoryDetails(data);
      console.log(data);
    } catch (e) {
      console.log("Error fetching data :", e.message);
    }
  };

  const onChangeSearchInput = (e) => {
    const keyword = e.target.value.toLowerCase();
    setInputText(keyword);
    if (keyword === "") {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword)
      );
      setProducts(filteredProducts);
    }
  };

  const onClickNextBtn = () => {
    setPageNo((prev) => prev + 1);
    const newOffset = offset + limit;
    const newControlLimit = controlLimit + limit;
    const updatedProduct = originalProducts.slice(newOffset, newControlLimit);
    setOffset(newOffset);
    setControlLimit(newControlLimit);
    setProducts(updatedProduct);
  };

  const onClickPrevBtn = () => {
    setPageNo((prev) => prev - 1);
    const newOffset = offset - limit;
    const newControlLimit = controlLimit - limit;
    const updatedProduct = originalProducts.slice(newOffset, newControlLimit);
    setOffset(newOffset);
    setControlLimit(newControlLimit);
    setProducts(updatedProduct);
  };

  const onchangePage = (e) => {
    let value = parseInt(e.target.value);
    if (value === 10) {
      setPageNo(1);
      setOffset(0);
      setLimit(value);
      setControlLimit(value);
      let updatedProduct = originalProducts.slice(0, 10);
      setProducts(updatedProduct);
    } else {
      setLimit(value);
      setControlLimit(value);
      let updatedProduct = originalProducts.slice(offset, value);
      setProducts(updatedProduct);
    }
  };

  const getMonthName = (month) => {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "";
    }
  };

  const renderLoader = () => (
    <div className="loading-container">
      <div className="loading-animation"></div>
    </div>
  );

  const renderTable = () => (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductItems product={product} />
          ))}
        </tbody>
      </table>
      <div className="bottom-container">
        <div className="button-container">
          <button
            type="button"
            disabled={pageNo === 1}
            onClick={onClickPrevBtn}
            className="button prev"
          >
            Prev
          </button>
          <h1 className="page-no">
            Page No. <span>{pageNo}</span>
          </h1>
          <button
            disabled={pageNo === Math.ceil(originalProducts.length / limit)}
            type="button"
            onClick={onClickNextBtn}
            className="button next"
          >
            Next
          </button>
        </div>
        <div>
          <label className="per-page">Per Page : </label>
          <select
            className="per-page-select"
            onChange={onchangePage}
            value={limit}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header month={month} onChangeMonth={onChangeMonth} />
      <div className="main-container">
        <div className="heading-container">
          <h1>Transaction Dashboard</h1>
        </div>
        <div className="input-month-container">
          <div className="input-month-responsive-container">
            <input
              placeholder="Search"
              onChange={onChangeSearchInput}
              value={inputText}
              type="search"
            />
            <h1 className="name-month">{nameMonth}</h1>
          </div>
        </div>
        {loading ? renderLoader() : renderTable()}
      </div>
      <TransactionStatistics
        nameMonth={nameMonth}
        salesDetails={salesDetails}
        loading={loading}
      />
      <TransactionBarChart
        nameMonth={nameMonth}
        priceRangeDetails={priceRangeDetails}
        loading={loading}
      />
      <TransactionPieChart
        nameMonth={nameMonth}
        categoryDetails={categoryDetails}
        loading={loading}
      />
    </>
  );
};

export default TransactionDashboard;
