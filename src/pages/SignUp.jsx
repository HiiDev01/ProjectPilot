import React, { useState } from 'react'
import '../styles/SignUp.css'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const validate = () =>{
    const newError = {} ;

    const regex = /\S+@\S+\.\S+/;

    if(!formData.email || formData.email === ''){
      newError.email = 'enter email field';
      setFormError(newError)
    } else if(!regex.test(formData.email)){
       newError.email = "enter a valid email"
       setFormError(newError);
    }

    if (!formData.name || formData.name.trim() === '') {
      newError.name = 'Name is required';
      setFormError(newError);
    }

    if(!formData.password.trim()){
      newError.password = "enter password";
      setFormError(newError);
    }else if(formData.password.length < 6){
      newError.password = "password should be more than 6 character"
      setFormError(newError);
    }

    setFormError(newError);
    return Object.keys(newError).length === 0 ;
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(validate()){
      await userSignup();
    }
  }

  const userSignup = async() => {
    setLoading(true)
    try {
      const checkExistingEmail = await fetch(`http://localhost:5000/users?email=${formData.email}`)
      const existingEmail = await checkExistingEmail.json()

      if(existingEmail.length > 0){
        alert('email already exist');
        setLoading(false);
        return
      }

      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
      if(!res.ok){
        throw new Error('failed to post crendentials')
      }
      const data = await res.json()
      alert('registration succesful redirecting to login in 3s')
      setFormData({ name: '', email: '', password: '' });
      console.log(data)
      setTimeout(()=>{
        navigate('/')
      }, 3000)
    } catch (error) {
      console.log(error);
      alert('registration failed');
    } finally{
      setLoading(false)
    } 
  }

  return (
    <div className='signup'>
       <div className='wrapper'>
        <div className='head'>
          <div>
            <svg  xmlns="http://www.w3.org/2000/svg" 
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
          <p>Create your account to get started</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
           <label htmlFor="name">name</label>
           <input 
              type="text"
              name='name'
              id='name'
              placeholder='enter your name'
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
           />
           {formError.name && <p>{formError.name}</p>}
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
           {loading ? 'loading...' : 'register'}
          </button>
          {/*}
          <button 
            className='demo'
            type= "button"
            /*onClick={handleDemoLogin}
          >
              Demo login
          </button>*/}
          <p className='signupLink'>already have an account? <a href="/">Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
