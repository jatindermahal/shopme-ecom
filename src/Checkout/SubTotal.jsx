import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../State/ServiceProvider'

import './SubTotal.css'

function SubTotal() {
  const [{cart}] = useStateValue();

  return (
    <div className="cart-subtotal">
      <h2>Subtotal <small class="text-muted">({cart.length} items)</small>
      <CurrencyFormat 
        renderText={(value)=>
          <>
              : {value}
          </>
        }
        decimalScale={2}
        thousandSeparator={true}
        value={cart.reduce((partialSum, item) => partialSum + item.price, 0)}
        prefix={"$"}
        displayType={"text"}
      />
      </h2>
      <hr />
      <small><b>Note:</b> This is not the final amount. Taxes will be recalculated when you checkout</small>
      <button className='btn'>Checkout</button>
    </div>
  )
}

export default SubTotal
