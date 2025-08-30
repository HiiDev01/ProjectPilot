import React, { useEffect, useState } from 'react'
import { MdOutlineWbSunny } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";

const Theme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(()=>{
    const savedTheme = localStorage.getItem('theme') || 'light';
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
          <p><LuSunMoon size={18}/></p>
        ): (
          <p><MdOutlineWbSunny size={18}/></p>
        )}
      </button>
    </div>
  )
}

export default Theme
