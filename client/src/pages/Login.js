import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './loginpage.css'

const Login = () => {
    const type="admin";
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
 async function LoginUser(event){
    event.preventDefault();
    const response=await fetch('http://localhost:1337/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        
        email,
        password,
      }),
    })
    const data = await response.json()
    if(data.user!=''){
      alert('Login Successful');
      window.location.href=`/dashboard/${type}/${data.user[0]._id}`;
    }
    else{
      alert('Please check login credentials')
    }
  }
  
 /* const LoginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({ email, password, role })
    });
    const json = await response.json();
    console.log(json);
     if  (json.success || role === "admin") {
        //save the auth token and redirect
        alert('Login Successful')
      window.location.href='/dashboard'
    }
     else if  (json.success || role === "employee") {
         //save the auth token and redirect
         alert('Login Successful')
      window.location.href='/'
    }
     else if  (json.success || role === "publisher") {
         //save the auth token and redirect
         alert('Login Successful')
      window.location.href='/student'
    }
    else{
        alert("Invalid")
    }*/


  return (
    <div className="page">
      <div className='login-box'>
      <h1>Login</h1>
      <form onSubmit={LoginUser}>
       <label>Login</label>
        <input value={email}
          onChange={(e) => setEmail(e.target.value)} type="email" ></input><br/>
          <label>Password</label>
        <input value={password}
          onChange={(e) => setPassword(e.target.value)} type="password"></input><br/>
          <input type="submit" value="Login" />
      </form>
      </div>
    </div>
  )
}

export default Login