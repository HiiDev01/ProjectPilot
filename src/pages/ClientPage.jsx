import React, { useEffect, useRef } from 'react'
import NavBar from '../components/NavBar';
import '../styles/ClientPage.css'
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";


const ClientPage = () => {
  const [searchBox, setSearchBox] = React.useState("");
  const [clients, setClients] = React.useState([]);
  const [clientPopup, setClientPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [newClient, setNewClient] = React.useState({
    company: "",
    email: "",
    projectNumber: 0
  });

  const fliterClients = searchBox.trim() ?
    clients.filter((client) =>
       client.company.toLowerCase().includes(searchBox.trim().toLocaleLowerCase())
  ) 
  : clients;

  
  const handleChangeInput = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value
    });
  }
  const popRef = useRef(null);

  useEffect(() => {
    const  handleClickOutside = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setClientPopup(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [popRef])

  useEffect(()=>{
    const fetchClients = async () => {
      try {
        const res = await fetch('http://localhost:5000/clients')
        if(!res.ok){
          throw new Error('failed to fetch clients')
        }
        const data = await res.json();
        setClients(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    }  
    fetchClients();
  }, []);

  const handleAddClient = () => {
    setClientPopup(true);
  }
  const handleClosePopup = () => {
    setClientPopup(false);
  }

  const  handleSaveClient = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const checkExistingClient = await fetch(`http://localhost:5000/clients?email=${newClient.email}`)
      const existingClient = await checkExistingClient.json();

      if(existingClient.length > 0){
        alert('cleint with this email already exists');
        setLoading(false);
        setNewClient({company: '', email: '', projectNumber: 0})
        return;
      }
      

      const res = await fetch('http://localhost:5000/clients', {
        method: 'POST', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newClient)
      })
      if(!res.ok){
        throw new Error('failed to add client')
      }
      const addedClient = await res.json();
      setClients((prev) => [...prev, addedClient]);
      setNewClient({company: "", email: "", projectNumber: 0});
      setClientPopup(false);
      alert('client added successfully');
      setLoading(false);
      handleClosePopup();
    } catch (error) {
      console.error('Error adding client:', error);
      setLoading(false);
      return
    } finally {
      setLoading(false);
    }
  }
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
                  value={searchBox} 
                  onChange={(e) => setSearchBox(e.target.value)}
                  placeholder='search by client name'
                />
              </div>
              <button onClick={handleAddClient}> 
                <span><IoIosAddCircleOutline size={18}/></span>
                add client
              </button>
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
                {fliterClients.map((client) => (
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


      {clientPopup && (<div className='addClientPopup'>
        <div className='card' ref={popRef}>
          <button className='cardClose' onClick={handleClosePopup}>
            <LiaTimesSolid size={18}/>
          </button>
          <div className="hd">
            <h2>Add New Client</h2>
            <p>Enter the details of the new client. Click save when you're done.</p>
          </div>
          <form action="" className='Clform' onSubmit={handleSaveClient}>
            <label htmlFor="company">name</label>
            <input 
              type="text" 
              name="company" 
              id="company" 
              placeholder='innovate inc.'
              value={newClient.company}
              onChange={handleChangeInput}
              required
            />
            <label htmlFor="email">email</label>
            <input type="email" 
              name="email" 
              id="email" 
              placeholder='contact@innovate.com'
              value={newClient.email}
              onChange={handleChangeInput}
              required
            />
            <button 
              type="submit"
              disabled={loading}> 
             {loading ? 'saving...' : 'save client'}
            </button>
          </form>
        </div>
      </div>)}
    </div>
  )
}

export default ClientPage
