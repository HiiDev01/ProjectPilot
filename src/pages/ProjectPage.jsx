import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/ProjectPage.css'

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
        </div>
      </main>
    </div>
  )
}

export default ProjectPage
