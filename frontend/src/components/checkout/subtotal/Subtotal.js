import React, { useContext } from "react";
import "./Subtotal.css";
import DataContext from "../../../data/dataContext";

const Subtotal = () => {
  const { total, checkoutItemNum } = useContext(DataContext);

  return (
    <div className="subtotalContainer">
      <p>
        Subtotal {checkoutItemNum} items: Rs <b>{total}</b>
      </p>
      <div className="giftSection">
        <input type="checkbox" checked={false} className="giftCheckbox" readOnly></input>
        <p>This order contains a gift </p>
      </div>
      <button className="proceedButton">Proceed to checkout</button>
    </div>
  );
};

export default Subtotal;
