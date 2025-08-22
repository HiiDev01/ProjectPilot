import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/ProjectPage.css'
import { IoIosAddCircleOutline } from "react-icons/io";

const ProjectPage = () => {
  return (
    <div className='projectPage'>
      <>
        <NavBar/>
      </>
      <main className='projectMain'>
        <div className='projectHeader'>
          <div className="projecthead">
            <h1>All Projects</h1>
            <p>Manage your projects here. An overview of all  latest projects.</p>
          </div>
          <button className='addProjectBtn'> 
            <span><IoIosAddCircleOutline size={18}/></span>
            add project
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>project</th>
                <th>client</th>
                <th>status</th>
                <th>dues date</th>
                <th>action</th>
              </tr>
            </thead>
          </table>
        </div>
      </main>
    </div>
  )
}

export default ProjectPage
