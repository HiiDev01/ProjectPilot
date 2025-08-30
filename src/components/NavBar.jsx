import React from 'react'
import '../styles/NavBar.css'
import { FiHome } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { LuUsers } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Theme from './Theme';

const NavBar = () => {
  const navList = [
    {name: 'dashboard', path: '/dashboard', icon: <FiHome size={18}/>},
     {name: 'client', path: '/client', icon: <LuUsers size={18}/>},
      {name: 'project', path: '/projects', icon: <GrProjects size={18}/>},
      /*{name: 'email client', path: '/email client', icon: <MdOutlineEmail size={18}/>},
      {name: 'premium plan', path: '/email client', icon: <BsStars size={18}/>},*/
  ]
  return (
    <div className='navbar'>
      <div className='logo'>
        <svg   xmlns="http://www.w3.org/2000/svg" 
        width="30" 
        height="30" 
        viewBox="0 0 24 24"
        fill="none" 
        stroke="var(--main)" 
        strokeWidth="2.1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="lucide lucide-pilcrow h-8 w-8 text-primary"><path d="M13 4v16"></path><path d="M17 4v16"></path><path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13"></path></svg>
        <h1>ProjectPilot</h1>
      </div>

      <div className='navWrapper'>
        <div className='navMinWrapper'>
          <ul>
            {navList.map((list, index) => (
              <NavLink to={list.path} key={index} 
                className={({isActive}) =>
                isActive ? "navlink active" : "navlink"}
              >
                <li>
                  <span>{list.icon}</span>
                  {list.name}
                </li>
              </NavLink>
            ))}
          </ul>
          <div className='ThemeWrapper'>
            <Theme/>
            <p>change mode</p>
          </div>
        </div>
  
        <div className='userBtn'>
          <div className="userImg">
           {/* <img src="" alt="" /> */}
          </div>
          <div className='userInner'>
            <h4>user</h4>
            <p>user@email.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
