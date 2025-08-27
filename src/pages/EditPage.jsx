import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getProjects, updateProject } from '../apis/Api';
import e from 'express';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fillForm, setFillForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const loadProject = async() => {
      try {
        const client = await getProjects()
        const foundClient = client.find(c => c.id === id);
        setFillForm(foundClient);
      } catch (error) {
        console.log(error.message, 'can find form project to fill in')
      }finally{
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleChange = (e) =>{
    setFillForm({
      ...fillForm, 
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async ()=>{
    e.preventDefault();
    setLoading(true);
    try {
      await updateProject(fillForm)
      navigate('/projects')
    } catch (error) {
      console.error(error, 'failed to update form')
    }finally{
      setLoading(false)
    }
  }

    if (loading) return <p>Loading...</p>;
  if (!fillForm) return <p>Project not found</p>;

  return (
    <div>
      
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
  )
}

export default EditPage
