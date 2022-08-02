import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import eCom from "../assets/e-com-logo.png";
import { auth } from '../firebase';
import './Login.css'

// let msg = '';

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const signIn = e => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .then(auth => {
      setMsg('');
      navigate("/", { replace: true })
    })
    .catch(err => {
      if(err.message.includes("user-not-found")){
        setMsg(`No user with email ${email} exists. Try creating a new account.`);
      }
      else if(err.message.includes("internal-error")){
        setMsg("Please enter credentials properly")
      }
      else if(err.message.includes("invalid-email")){
        setMsg("Please enter a valid email")
      }
      else if(err.message.includes("wrong-password")){
        setMsg("Incorrect password for this account.")
      }
      else if(err.message.includes("too-many-requests")){
        setMsg("Account closed temporarily as there were many failed login attempts. Please try again later.")
      }
      else{
        setMsg("Error occurred while trying to login.")
      }
    })
  }

  
  return (
    <div className='login'>
        <div className="login-logo">
          
          <Link to='/' className="align-middle" id="website-name">
            SHOP ME
          </Link>
          <img src={eCom} alt="Website logo" />
        </div>

      {   
        msg ? 
        <>
        <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
          <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlinkHref="#exclamation-triangle-fill"/></svg>
          <div className=''>
            {msg}
          </div>
        </div>
            
        </>
        : ""
      }

      <div className="login-box container mt-5">
          <h1>Sign-in</h1>

          <form>
            <label htmlFor='email' className='form-label'><h6>E-Mail</h6></label>
            <input 
              className='form-control mb-3' 
              value={email} 
              id='email' 
              type="text" 
              onChange={handleEmailChange}
            />

            <label htmlFor='password'><h6>Password</h6></label>
            <input 
              className='form-control mb-3' 
              value={password} 
              id='password' 
              type="password" 
              onChange={e => setPassword(e.target.value)}
            />          
            
            <button type="submit" onClick={signIn} className='btn login-sign-in mt-3 mb-2'>Sign In</button>
          </form>
          <div className="mt-4 mb-2 login-footer">
            <p className='text-center'>Don't have an account yet?</p>
            <Link to="/signup"><button className='btn login-create-acc'>Create account</button></Link>
          </div>
      </div>
    </div>
  )
}

export default Login
