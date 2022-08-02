import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Checkout from './Checkout/Checkout';
import { auth } from './firebase';

import Home from './Home/Home';
import Login from './Login/Login';

import './App.css';
import { useStateValue } from './State/ServiceProvider';
import SignUp from './Login/Signup';

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log("user from app.jsx",authUser);
      if(authUser){
        dispatch({type:"SET_USER",user: authUser});
      }
      else{
        dispatch({type:"SET_USER",user: null}); 
      }
    })
  },[])

  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<h2>Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
