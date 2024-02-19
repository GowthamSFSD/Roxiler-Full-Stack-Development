import React from "react";
import companyImg from "../../Assets/Roxiler.jpg";
import "./index.css";

const Header = (props) => {
  
  const { month, onChangeMonth } = props;
  return (
    <>
      <div className="header">
        <div className="responsive-header">
          <img className="company-logo" src={companyImg} alt="Company-Name" />
          <select value={month} onChange={onChangeMonth} className="select">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Header;
