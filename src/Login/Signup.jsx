import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import eCom from "../assets/e-com-logo.png";
import { auth } from '../firebase';
import './Login.css'


function SignUp() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    let target = e.target; 
    let value = target.value;
    let name = target.name;

    setUserData(userData => {
        return {...userData, [name]: value}; 
    });
  }



  const register = e => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(userData.email,userData.password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName: userData.firstName
      })
      return authUser;
    })
    .then((authUser)=>{
      setMsg('');
      console.log("Authuser from login.jsx",authUser);
      if (authUser){
        navigate("/", { replace: true })
      }}
    )
    .catch(err => {
      console.log(err.message)
      if(err.message.includes("weak-password")){
        setMsg("For security measures, enter a password of at least 6 charachters.");
      }
      else if(err.message.includes("internal-error")){
        setMsg("Please enter credentials properly")
      }
      else if(err.message.includes("invalid-email")){
        setMsg("Please re-check your email")
      }
      else if(err.message.includes("email-already-in-use")){
        setMsg("Email is already associated with another account.")
      }
      else{
        setMsg("Error occurred while trying to create account.")
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
          <h1>Register</h1>

          <form>
          <div className="fullName">
             
            <div className="firstName me-1">
                <label htmlFor='firstName'  className='form-label m-0'><h6>First Name</h6></label>
                <input 
                className='form-control mb-3' 
                name="firstName"
                value={userData.firstName}
                id='firstName' 
                type="text" 
                onChange={handleChange}
                />
            </div> 

            <div className="lastName ms-2">
                <label htmlFor='lastName'  className='form-label m-0'><h6>Last Name</h6></label>
                <input 
                className='form-control ' 
                name="lastName"
                value={userData.lastName}
                id='lastName' 
                type="text" 
                onChange={handleChange}
                />
            </div>
          </div>

            <label htmlFor='email' className='form-label m-0'><h6>E-Mail</h6></label>
            <input 
              className='form-control mb-3'
              name="email" 
              value={userData.email} 
              id='email' 
              type="text" 
              onChange={handleChange}
            />

            <label htmlFor='password' className='form-label m-0'><h6>Password</h6></label>
            <input 
              className='form-control mb-3' 
              value={userData.password} 
              name="password"
              id='password' 
              type="password" 
              onChange={handleChange}
            />          
            
            <button type="submit" onClick={register} className='btn login-sign-in mt-3 mb-2'>Create an account</button>
          </form>
          <div className="mt-4 mb-2 signup-footer">
            <p className='text-center'>Already have an account?</p>
            <Link to="/login"><button className='btn login-create-acc'>Sign in</button></Link>
          </div>
      </div>
    </div>
  )
}

export default SignUp
