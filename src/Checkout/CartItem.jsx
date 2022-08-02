import React from "react";
import { useStateValue } from "../State/ServiceProvider";
import "./CardItem.css";

function CartItem({ item }) {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: item.id,
    });
  };

  return (
    <div className="item container-fluid">
      <div className="row">
        <img
          className="col-sm-4"
          src={item.image}
          alt={`product-${item.id}`}
        ></img>
        <div className="col-sm-6 title text-wrap text-break text-justify">
          <h5>{item.name}</h5>
          <button className="btn" onClick={removeFromCart}>
            Remove
          </button>
        </div>
        <div className="col-sm-2">
          <p className="prod-price">
            <small>$</small>
            <strong>{item.price}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
