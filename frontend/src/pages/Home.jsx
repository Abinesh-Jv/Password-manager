import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate();

  React.useEffect(()=>{
    if(!localStorage.getItem('password-manager-user')){
      navigate('/login');
    }
  }
  );

  const logout = e=>{
    localStorage.removeItem("password-manager-user");
    navigate('/login');
  }
  
  return (
    <div>
      <h1 Style={'margin-top: 30px;margin-left: 02px;'}>You are successfully logged in to JVCONNECT as </h1>
      <h2>{localStorage.getItem('password-manager-user') ? JSON.parse(localStorage.getItem('password-manager-user')).username: "null"}</h2>
      <button onClick={e=>logout(e)} Style={'background-color: #9999ff;padding-left: 30px;padding-right: 30px;margin-top: 30px;margin-left: 30px;padding-top: 30px;padding-bottom: 30px;color: black;font-size:5rem;'}>LOG OUT</button>
      </div>
  )
}

