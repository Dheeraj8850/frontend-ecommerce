import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { data } from '@remix-run/router';

export const LoginSignup = () => {

  const [showPassword,setShowPassword] = useState(false);

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Login Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accepts:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }


  const signup = async ()=>{
    console.log("SignUp Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/json',    //application/form-data
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input name='username' type="text" value={formData.username} onChange={changeHandler} placeholder='Your Name'/>:<></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler}  placeholder='Email Address'/>
          <div style={{position:"relative"}}>
          <input type={showPassword?"text":"password"} name='password' value={formData.password} onChange={changeHandler} placeholder='Password'/>
          <span 
              onClick={() => setShowPassword(!showPassword)}  
              style={{position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)", cursor:"pointer"}}
            >
              {showPassword ? "👁️" : "👁️"}
            </span>
          </div>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
