import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getProjects, updateProject, getClients } from '../apis/Api';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fillForm, setFillForm] = useState(null);
  const [company, setComapany] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const loadProject = async() => {
      try {
        const client = await getProjects()
        const foundProject = client.find(p => p.id === id);
        setFillForm(foundProject);
      } catch (error) {
        console.log(error.message, 'can find form project to fill in')
      }finally{
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);


  ///load comapny for select option
  useEffect(()=>{
    const loadCompany = async () =>{
      try {
        const clientList = await getClients()
        setComapany(clientList) 
      } catch (error) {
        console.error('failed to fetch companu data in edit page')
      }
    }
    loadCompany()
  }, [])

  //// tracking form input 
  const handleChange = (e) =>{
    setFillForm({
      ...fillForm, 
      [e.target.name]: e.target.value
    });
  }
  // tracking file upload
  const changeFile = (e)=>{
    const files = e.target.files[0];
    setFillForm({
      ...fillForm,
      file: files ? files.name : null
    });
  }

  /// update button function
  const handleSave = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      await updateProject(fillForm);
      alert('form succesfully update');
      navigate("/projects", { state: { updated: true } });
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
      
      <form action="" className='projectForm' onSubmit={handleSave}>
        <label htmlFor="project"> project name</label>
        <input 
          type="text" 
          name="title" 
          placeholder='E-commerce Platform' 
          value={fillForm.title || ""}
          onChange={handleChange}
          required/>
        <label htmlFor="company">client</label>
        <select name="company" 
          value={fillForm.client}
          onChange={handleChange}
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
              value={fillForm.templateUrl || ""}
              onChange={handleChange}
              required/>
          </div>
          <div>
            <label htmlFor="site">website url</label>
            <input 
              type="url" 
              name="webUrl" 
              placeholder='https://projecturl.com'
              value={fillForm.webUrl || ""}
              onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="startDate">Start Date</label>
            <input 
              type="date" 
              name="startDate" 
              placeholder='start date' 
              value={fillForm.startDate || ""}
              onChange={handleChange}
              required/>
          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input 
              type="date" 
              name="endDate" 
              placeholder='due date' 
              value={fillForm.endDate || ""}
              onChange={handleChange}
              required/>
          </div>
        </div>
        <label htmlFor="file">project image</label>
        <input 
          type="file" 
          name="file" 
          onChange={changeFile}
          placeholder=''/>
        <button type="submit">update project</button>
      </form>


    </div>
  )
}

export default EditPage
