import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/ProjectPage.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { getClients, getProjects, addNewProject, updateClientProjectNumber } from '../apis/Api';
import { useLocation } from 'react-router-dom';



const ProjectPage = () => {
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    templateUrl: "",
    webUrl: "",
    startDate: "",
    endDate: "",
    file: null
  });
  const [projects, setProjects] = useState([]);
  const [company, setCompany] = useState([]);
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState(null);
  const popRef = useRef(null);
  const location = useLocation()

  /// button to show the poup form
  const handleShowAddForm = () => {
    setPopup(true);
  }

  // buttont to close the popup form
  const closeShowAddForm = () => {
    setPopup(false)
  }

  /////////Ref  to close the poup form
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
  }, [popRef]);

  /// tracking the Popup form input and updating
  const handleChangeProjectInput = (e) => {
    setNewProject({
      ...newProject, 
      [e.target.name]:  e.target.value
    })
  }
  const handleFileChange = (e) => {
    setNewProject({
      ...newProject,
      file: e.target.files[0]   // store File object
    });
  };
  
  ///fetching the projects existing projects
  const fetchProjects = async () => {
    try {
      const res = await getProjects()
      setProjects(res);
    } catch (error) {
      setError('error fetching data');
    }
  }




  //calling the project inside a useEffect
  useEffect(() => {
    fetchProjects();
  }, [location]);

  /// fetching the client to for the select option
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
  },[]);

////adding new projects functions
  const handleAddNewProject = async(e) =>{
    e.preventDefault();
    try {

      const formattedProject = {
        title: newProject.name,
        company: newProject.client,
        status: "pending",         
        dueDate: newProject.endDate,
        link: newProject.webUrl,
        templateUrl: newProject.templateUrl,
        startDate: newProject.startDate,
        file: newProject.file ? newProject.file.name : null
      }

      const data = await addNewProject(formattedProject);
      if(!data){
        console.log('data can not be recorded')
      }
      const client = await getClients();
      const existingClient = client.find(c => c.company === newProject.client)
      if(existingClient){
        await updateClientProjectNumber(
          existingClient.id,
          (existingClient.projectNumber || 0) + 1
        );
        console.log("Client project number updated ✅");

      }
      alert('project successfully added');
      await fetchProjects();
      setPopup(false);
      setNewProject({name: "",client: "",templateUrl: "",webUrl: "",startDate: "",endDate: "",file: null,
    });
    } catch (error) {
      console.error(error);
    }
  }



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
                  <td className='tableLinkCon'>
                    <a href={`/project/${project.id}/edit`}>
                      <button  
                        className='editBtn'
                      >
                        <FaRegEdit size={18}/>
                      </button>
                    </a>
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

          <form action="" className='projectForm' onSubmit={handleAddNewProject}>
            <label htmlFor="project"> project name</label>
            <input 
              type="text" 
              name="name" 
              placeholder='E-commerce Platform' 
              value={newProject.name}
              onChange={handleChangeProjectInput}
              required/>
            <label htmlFor="client">client</label>
            <select name="client" 
              value={newProject.client}
              onChange={handleChangeProjectInput}
            >
              <option value="">-- Select a client company --</option>
              {company.map((comp) => (
                <option value={comp.company} key={comp.id}>
                  {comp.company}
                </option>  
              ))}
            </select>
            <div className='formgrid'>
              <div>
                <label htmlFor="template">template url</label>
                <input 
                  type="url" 
                  name="templateUrl"  
                  placeholder='https//example.com'
                  value={newProject.templateUrl}
                  onChange={handleChangeProjectInput}
                  required/>
              </div>
              <div>
                <label htmlFor="site">website url</label>
                <input 
                  type="url" 
                  name="webUrl" 
                  placeholder='https://projecturl.com'
                  value={newProject.webUrl}
                  onChange={handleChangeProjectInput}/>
              </div>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <input 
                  type="date" 
                  name="startDate" 
                  placeholder='start date' 
                  value={newProject.startDate}
                  onChange={handleChangeProjectInput}
                  required/>
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <input 
                  type="date" 
                  name="endDate" 
                  placeholder='due date' 
                  value={newProject.endDate}
                  onChange={handleChangeProjectInput}
                  required/>
              </div>
            </div>
            <label htmlFor="file">project image</label>
            <input 
              type="file" 
              name="file" 
              onChange={handleFileChange}
              placeholder=''/>
            <button type="submit">create project</button>
          </form>
        </div>
      </div>
      )}
    </div>
  )
}

export default ProjectPage
