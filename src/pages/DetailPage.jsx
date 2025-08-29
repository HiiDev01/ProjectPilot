import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../apis/Api'
import '../styles/DetailPage.css'
import { IoIosArrowBack } from "react-icons/io";



const DetailPage = () => {
  const {id} = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const handleProject = async() =>{
      try {
        const data = await getProjectById(id)
        setProject(data)
      } catch (error) {
        console.error('failed to get project details', error)
      }finally{
        setLoading(false)
      }
    }
    handleProject();
  }, [id])

    if (loading) {
    return (
      <div className="detailPage">
        <NavBar />
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className='detailPage'>
      <>
        <NavBar/>
      </>
      <div className='Det_Main'>
        <div className='container'>
          <p className='backPara'><a href="/projects" className='backLink'> <IoIosArrowBack size={18}/> back</a></p>
          <h1>{project.title}</h1>
          {project.file && (
            <div className='imageCon'>
              {/* If your backend serves uploaded files as URLs */}
              <img
                src={project.file}
                alt={project.title}
                style={{ maxWidth: "400px", borderRadius: "8px" }}
              />
            </div>
          )}
          <div className='det_body'>
            <div className='para_det'>
              <p><strong>Client:</strong> {project.company}</p>
              <p><strong>Status:</strong> {project.status}</p>
              <p><strong>Due Date:</strong> {project.dueDate}</p>
              <p><strong>Start Date:</strong> {project.startDate}</p>
            </div>
      
            {project.link && (
              <p className='para_Link'>
                <a href={project.link} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
        
    </div>
  )
      

}

export default DetailPage
