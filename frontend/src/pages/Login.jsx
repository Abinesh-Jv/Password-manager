import React from 'react'
import styled from 'styled-components'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'
 


export default function Login() {

  const navigate = useNavigate();

    let [details,setDetails] = React.useState({
    username:"",
    password:""
  });
  
    let errorOptions = {
    position:"bottom-right",
    autoClose:5000,
    pauseOnHover:false,
    draggable:false,
    theme:"dark"
  }

  React.useEffect(()=>{
    if(localStorage.getItem('password-manager-user')){
      navigate('/');
    }
  });

  const validation = ()=>{
    const {username,password} = details;
    if(password===""){
      toast.error(`username and password must be valid`,errorOptions);
      return false;
    } else if(username===""){
      toast.error(`username and password must be valid`,errorOptions);
      return false;
    }
    return true;
  }

  const handleChange = (e)=>{
    setDetails({...details,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = async event=>{
    event.preventDefault();
    if (validation()){
      let {username,password} = details;
      let {data} = await axios.post(loginRoute,{username,password});
      if (data.status){
        localStorage.setItem('password-manager-user',JSON.stringify(data.user));
        navigate('/');
      } else {
        toast.error(data.msg,errorOptions);
      }
    }
  };


  return (
    <>
      <FormContainer onSubmit={event=>handleSubmit(event)}>
        <form>
        <div className='head'>
          <img src='' alt='' />
          <h1>JVCONNECT</h1>
        </div>
        <input 
          type='text' 
          placeholder='Username' 
          name='username' 
          onChange={e=>handleChange(e)} />
        <input 
          type='password' 
          placeholder='Password' 
          name='password' 
          onChange={e=>handleChange(e)} />
        <button type='submit'>Login</button>
        <span>Doesn't have an account ? <Link to='/register'>register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );

  
}



const FormContainer = styled.div`

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .head {
    display: flex;
    align-item: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction:column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding :3rem 5rem;
    input {
      background-color :transparent;
      padding :1rem;
      border :0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color:white;
      width: 100%;
      font-size:1rem;
      &:focus {
        border :0.1rem solid #997af0;
        outline :none;
      }
    }
    button {
      background-color :#997af0;
      color:white;
      padding : 1rem 2rem;
      border:none;
      font-weight:bold;
      cursor: pointer;
      border-radius:0.4rem;
      font-size: 1rem;
      text-transform : uppercase;
      transition :0.3s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color:white;
      text-transform:uppercase;
      a{
        color:#4e0eff;
        font-weight:bold;
      }
    }
  }

`;
