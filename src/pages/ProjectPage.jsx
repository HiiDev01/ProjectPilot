import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/ProjectPage.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { BsSuitcaseLg } from "react-icons/bs";
import { getClients, getProjects } from '../apis/Api';



const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [company, setCompany] = useState([]);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState(null);
  const popRef = useRef(null);

  const handleShowAddForm = () => {
    setPopup(true);
  }
  const closeShowAddForm = () => {
    setPopup(false)
  }
  useEffect(()=>{
    const handleClosePop = (e) =>{
      if(popRef.current && !popRef.current.contains(e.target)){
        setPopup(false)
      }
    }
    document.addEventListener('mousedown', handleClosePop);
    return () => {
      document.removeEventListener('mousedown', handleClosePop)
    }
  }, [popRef])

  useEffect(()=> {
    const fetchProjects = async () => {
      try {
        const res = await getProjects()
        setProjects(res);
      } catch (error) {
        setError('error fetching data');
      }
    }
    fetchProjects();
  }, []);

  useEffect(()=>{
    const fetchClients = async() => {
      try {
        const data = await getClients()
        setCompany(data);
      } catch (error) {
        console.log('error fetching client');
      }
    }
    fetchClients();
  },[])
  return (
    <div className='projectPage'>
      <>
        <NavBar/>
      </>
      <main className='projectMain'>
        <div className='projectHead'>
          <div className='projectHeadwrap'>
            <div>
              <h1>All Projects</h1>
              <p>Manage your projects here. An overview of all  latest projects.</p>
            </div>
            <button className='addProjectBtn' onClick={handleShowAddForm}> 
              <span><IoIosAddCircleOutline size={18}/></span>
              add project
            </button>
          </div>
        </div>

        <div className='projectsTable'>
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
            <tbody>
              {projects.map((project)=>(
                <tr key={project.id}>
                  <td className='cptd'>
                    <span>
                      <BsSuitcaseLg size={18} className='dashIcon'/>
                    </span>
                    {project.title}</td>
                  <td>{project.company}</td>
                  <td className='status'> 
                    <span className={`status-badge ${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>{project.dueDate}</td>
                  <td>
                    <a href={project.link} 
                      className='tableLink' 
                      target='_blank' 
                      rel='noreferrer'
                    >
                      <span><FiExternalLink size={18} className='icon'/></span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {popup && (<div className='overlay'>
        <div className='card' ref={popRef}>
          <div className="cardhead">
            <div className='headText'>
              <h2>Add new project</h2>
              <p>Fill in the details for the new project.</p>
            </div>
            <button className='closeBtn' onClick={closeShowAddForm}>
              <LiaTimesSolid size={18}/>
            </button>  
          </div>

          <form action="" className='projectForm'>
            <label htmlFor="project"> project name</label>
            <input type="text" name="project" placeholder='E-commerce Platform' required/>
            <label htmlFor="client">client</label>
            <select name="client">
              <option value="">-- Select a client company --</option>
              {company.map((comp) => (
                <option value={comp.company} key={company.id}>
                  {comp.company}
                </option>  
              ))}
            </select>
            <div className='formgrid'>
              <div>
                <label htmlFor="template">template url</label>
                <input type="url" name="template"  placeholder='https//example.com'required/>
              </div>
              <div>
                <label htmlFor="site">website url</label>
                <input type="url" name="site" placeholder='https://projecturl.com'/>
              </div>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <input type="date" name="date" placeholder='start date' required/>
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <input type="date" name="date" placeholder='due date' required/>
              </div>
            </div>
            <label htmlFor="file">project image</label>
            <input type="file" name="file" placeholder=''/>
            <button type="submit">create project</button>
          </form>
        </div>
      </div>
      )}
    </div>
  )
}

export default ProjectPage
