import React,{useState, useEffect} from 'react'
import Navbar from '../Header/Navbar'
import Product from '../Products/Product'
import './Home.css'
import SkeletonLoader from './SkeletonLoader';

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    fetch('https://api.bestbuy.com/v1/products?apiKey=qhqws47nyvgze2mq3qx4jadt&pageSize=50&format=json')
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setProducts(data.products);
    })

  },[])

  if(loading){
    return (
      <>
      <Navbar />
      <div className="home">
          <div className="banner">
            <h2 className='text-center'>Welcome to Shopme.ca</h2>
            <h3 className='text-center'>Please wait while we load the content for you :)</h3>
          </div>

          
          <div className="loader">
            { [...Array(20)].map( () => (    <SkeletonLoader/> )) }
          </div>
      </div>
      </>
    )
  }


  return (
    <>
      <Navbar />
      <div className="home">
          <div className="banner">
            <h2 className='text-center'>Welcome to Shopme.ca</h2>
            <h3 className='text-center'>Here we provide everything you need :)</h3>
          </div>
          
          <div className="products">

            {
              products.map(prod => {
                if(prod.images[0] != null)
                  return <Product 
                  id={prod.sku}
                  name={prod.name}
                  key={`product-${prod.sku}`}
                  image={prod.images[0]?.href}
                  ratings={Math.round(prod.customerReviewAverage)}
                  price={prod.salePrice}
                />
                return <></>
              })
            }

          </div>
      </div>
    </>
  )
}

export default Home
