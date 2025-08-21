const API_URL = "http://localhost:5000";

export const getClients =  async() => {
  const res = await fetch(`${API_URL}/clients`);
  return await res.json();
}

export const getProjects = async () =>{
  const res = await fetch(`${API_URL}/projects`);
  return await res.json();
}

export const getPendings = async () =>{
  const res = await fetch(`${API_URL}/projects?status=pending`);
  return await res.json();
}
export const getDelivered = async () =>{
  const res = await fetch(`${API_URL}/projects?status=delivered`);
  return await res.json();
}
export const getInProgess = async () =>{
  const res = await fetch(`${API_URL}/projects?status=in_progress`);
  return await res.json();
}
