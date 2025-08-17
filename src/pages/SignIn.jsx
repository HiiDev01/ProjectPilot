import React, { useEffect, useState } from 'react'
import '../styles/SignIn.css'
import Theme from '../components/Theme'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({})
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const validate = () => {
    let newError = {}
    const regex = /\S+@\S+\.\S+/;

    if(!formData.email || formData.email === ''){
      newError.email = 'email is required'
      setFormError(newError)
    }else if(!regex.test(formData.email)){
      newError.email = "Enter a valid email address";
      setFormError(newError)
    }

    if(!formData.password){
      newError.password = 'password is required'
      setFormError(newError);
    }else if(formData.password.length < 6){
      newError.password = "Password must be at least 6 characters";
      setFormError(newError);
    }

    setFormError(newError);
    return Object.keys(newError).length === 0 ;
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(validate()){
     await userLogin(formData);
    }
  }

  const handleDemoLogin = () =>{
    const demoData = {
      email: "demo123@email.com",
      password: "password123"
    }
    setFormData(demoData);
    userLogin(demoData);
  }

  const userLogin = async (user) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/users?email=${user.email}`, {
        method: 'GET', 
        headers: {"Content-Type" : "application/json"}
      })
      if(!res.ok){
        throw new Error('fetch posting form data failed')
      }
      const data = await res.json()
      if(data.length === 0){
        alert('no creadtial found');
        return
      }

      const foundUser = data[0]
      if(foundUser.password !== user.password){
        alert('error login creadnetial')
        return;
      }
      console.log('login successfully')
      navigate('/dashboard');
      
    } catch (error) {
      console.log(error, 'error occured')
    }finally{
      setLoading(false)
    }
  }







  return (
    <div className='home'>
      <div className='wrapper'>
        <div className='head'>
          <div>
            <svg   xmlns="http://www.w3.org/2000/svg" 
              width="33" 
              height="33" 
              viewBox="0 0 24 24"
              fill="none" 
              stroke="var(--main)" 
              strokeWidth="2.1" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-pilcrow h-8 w-8 text-primary"><path d="M13 4v16"></path><path d="M17 4v16"></path><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"></path></svg>
            <h1>ProjectPilot</h1>
          </div>
          <p>Enter your credentials to access your dashboard</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            />
            {formError.email && <p>{formError.email}</p>}
          <div className='innerCon'>
            <label htmlFor="password">password</label>
            <a href="">Forget your password?</a>
          </div>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            />
           {formError.password && <p>{formError.password}</p>}
          <button 
            type="submit" 
            className='loginBtn'
            disabled={loading}
          >
            {loading ? 'loading...' : 'login'}
          </button>
          <button 
            className='demo'
            type= "button"
            onClick={handleDemoLogin}
          >
              Demo login
          </button>
          <p className='signupLink'>Don't have an account? <a href="/signup">Sign up</a></p>
        </form>
      </div>
    </div>
  )
}

export default SignIn
