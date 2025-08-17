import React, { useEffect, useState } from 'react'

const Theme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(()=>{
    const savedTheme = localStorage.getItem('Theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const ToggleTheme = () =>{
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  }
  
  return (
    <div className='Theme'>
      <button onClick={ToggleTheme}>
        {theme === 'light' ? (
          <p>dark</p>
        ): (
          <p>light</p>
        )}
      </button>
    </div>
  )
}

export default Theme
