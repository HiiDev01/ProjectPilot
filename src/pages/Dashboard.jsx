import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/Dashboard.css'
import { LuUsers,LuClock } from "react-icons/lu";
import { BsSuitcaseLg } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getClients, getProjects,getPendings,getDelivered } from '../apis/Api'


const Dashboard = () => {
  const [dashItem, setDashItem] = useState({
    totalClient: 10,
    totalProject: 8,
    pendingProject: 2,
    deliveredProjects: 12
  });
  const [project, setProject] = useState([])

  useEffect(()=>{
    const fetchItems = async() =>{
      try {
        const [client, projects, pending, delivered] = await Promise.all([
          getClients(),
          getProjects(),
          getPendings(),
          getDelivered()
        ]);
        setDashItem({
          totalClient: client.length,
          totalProject: projects.length,
          pendingProject: pending.length,
          deliveredProjects: delivered.length
        });
      
      } catch (error) {
        console.log(error)
      }
    }
    fetchItems();
  },[])
  useEffect(()=>{
    const fetchProjects = async () =>{
      try {
        const res = await fetch('http://localhost:5000/projects');
        if(!res.ok){
          throw new Error  
        }
        const data  = await res.json()
        setProject(data)
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchProjects;
  }, [])
  
  return (
    <div className='dashboard'>
      <>
        <NavBar/>
      </>
      <div className='main'>
        <div className='head'>
          <h1>Dashboard</h1>
          <p>A quick overview of your business.</p>
        </div>
        <div className="dashGrid">
          <div className='dashItem'>
            <div className='heading'>
              <p>total client</p>
              <LuUsers size={18} className='dashIcon'/>
            </div>
            <h1>{dashItem.totalClient}</h1>
            <p>+2 last month</p>
          </div>

          <div className='dashItem'>
            <div className='heading'>
              <p>total projects</p>
              <BsSuitcaseLg size={18} className='dashIcon'/>
            </div>
            <h1>{dashItem.totalProject}</h1>
            <p>+2 last month</p>
          </div>

          <div className='dashItem'>
            <div className='heading'>
              <p>pending projects</p>
              <LuClock size={18} className='dashIcon'/>
            </div>
            <h1>{dashItem.pendingProject}</h1>
            <p>Awaiting approval</p>
          </div>

          <div className='dashItem'>
            <div className='heading'>
              <p>delivered projects</p>
              <IoMdCheckmarkCircleOutline size={18} className='dashIcon'/>
            </div>
            <h1>{dashItem.deliveredProjects}</h1>
            <p>Completed successfully</p>
          </div>

        </div>

        <div className='dashGridTwo'>

          <div className='projects'>
            <div className="projecthead">
              <h1>Recent Projects</h1>
              <p>An overview of the latest projects.</p>
            </div>
              <table>
                <thead>
                  <th>project</th>
                  <th>client</th>
                  <th>status</th>
                  <th>due date</th>
                </thead>
                  <tbody>
                    {project.map((projects) => (
                      <tr key={projects.id}>
                        <td>{projects.title}</td>
                        <td>{projects.clientName}</td>
                        <td>{projects.status}</td>
                        <td>{projects.dueDate}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
          </div>
          <div className='overview'></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
