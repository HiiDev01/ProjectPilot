import React, { useEffect } from 'react'
import NavBar from '../components/NavBar';
import '../styles/ClientPage.css'
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

const ClientPage = () => {
  const [clients, setClients] = React.useState([])

  useEffect(()=>{
    const fetchClients = async () => {
      try {
        const res = await fetch('http://localhost:5000/clients')
        if(!res.ok){
          throw new Error('failed to fetch clients')
        }
        const data = await res.json();
        setClients(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching clients:', error);
        
      }
    }  
    fetchClients();
  }, [])

  return (
    <div className='clientPage'>
      <div className='Container'>
        <>
          <NavBar/>
        </>
        <div className='main'>
          <header className='header'>
            <div className="Clienthead">
              <h1>Recent Projects</h1>
              <p>An overview of the latest projects.</p>
            </div>
            <div className='clientSearch'>
              <div className='search'>
                <CiSearch size={18}/>
                <input 
                  type="search" 
                  name="search" 
                  id="search" 
                  
                  placeholder='search by client name'
                />
              </div>
              <button> <span><IoIosAddCircleOutline size={18}/></span>add client</button>
            </div>
          </header>

          <div className='clientGrid'>
            <table className='clientTable'>
              <thead>
                <tr>
                  <th>client</th>
                  <th>emails</th>
                  <th>projects</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td className='clientName clientTd'>
                      <div className="clientImg">
                        <img src="#" alt="#" />
                      </div>
                      {client.company}
                    </td>
                    <td className='clientTd'>{client.email}</td>
                    <td className='clientTd'>{client.projectNumber}</td>
                  </tr>        
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div className='addClientPopup'>
        <div className='card'>
          <div className="hd">
            <h2>Add New Client</h2>
            <p>Enter the details of the new client. Click save when you're done.</p>
          </div>
          <form action="" className='Clform'>
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name" placeholder='innovate inc.'/>
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="email" placeholder='contact@innovate.com'/>
            <button type="submit">save client</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClientPage
