import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Header/Navbar'
import { useStateValue } from '../State/ServiceProvider';
import CartItem from './CartItem';
import './Checkout.css'
import SubTotal from './SubTotal';

function Checkout() {
  const [{cart,user}] = useStateValue();

  return (
    <div>
      <Navbar />
      <div className='checkout'>
        {cart?.length === 0 ? (
            <div className='empty-cart'>
                <h3>Cart is empty</h3>
                <span>You currently have no items in you shopping cart.</span>
                <p>Visit our <Link to={"/"}>home page</Link>  to buy items</p>
            </div>
         ) : (
            <div>
                <h3 className='cart-details-head'>{user ? `${user.displayName}'s` : 'Your'} Shopping cart contains {cart.length}{cart.length === 1 ? <span> item</span>: <span> items</span>}</h3>
                
                <div className="container-fluid">
                    <div className="row">
                        <div className="cart-items col-lg-9">
                            <div className='container-fluid cart-details'>
                                <div className='row'>
                                    <div className="col-sm-4">
                                        Product
                                    </div>
                                    <div className="col-sm-6">
                                        Description
                                    </div>
                                    <div className="col-sm-2">
                                        Price
                                    </div>
                                </div>
                            </div>
                            {cart.map(item =>
                                <CartItem item={item} />
                            )}
                        </div>
                        <div className="subtotal col-lg-3">
                            <SubTotal />
                        </div>
                    </div>
                </div>
            </div>
         )
        }
      </div>
    </div>
  )
}

export default Checkout
