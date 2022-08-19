import React from "react";
import { useStateValue } from "../State/ServiceProvider";
import "./Product.css";

function Product({ id, name, image, price, ratings }) {
  
  const [{cart},dispatch] = useStateValue();
  
  const addToCart = ()=>{
    dispatch({
      type:"ADD_TO_CART",
      item: {
        id, // same as id: id
        name, // same as name: name,
        image,
        price,
        ratings,
    }
    //ES6 syntax (if key and value same, value can be omitted)
  });
}

  return (
    // <div className="product card">
      <div className="product card" style={{width: "18rem"}}>

        <div className="card-body">
            <h5 className="card-title" title={name}>{name}</h5>
            <img className="card-img" src={image} alt={`product-${id}`}></img>
            <div className="card-text">
                <p className="prod-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <span className="prod-rating">
                    {Array(ratings)
                    .fill()
                    .map(() => (
                        <span>⭐</span>
                    ))}
                </span>
            </div>
            <button className="btn" onClick={addToCart}>Add to Cart</button>
        </div>
    </div>
  );
}

export default Product;
