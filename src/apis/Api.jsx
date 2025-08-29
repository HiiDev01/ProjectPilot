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

export const addNewProject = async (projectData) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(projectData)
  });
  if(!res.ok){
    throw new Error('failed to add new project')
  }
  return await res.json();
}

export const updateProject  = async (project) => {
  const res = await fetch(`${API_URL}/projects/${project.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(project)
  });
  if(!res.ok){
    throw new Error('failed to update form')
  }
  return await res.json();
}

export const updateClientProjectNumber  = async (userId, newCount) =>{
  try {
    const res = await fetch(`${API_URL}/clients/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectNumber: newCount }),
    });
    if (!res.ok) throw new Error("Failed to update client project number");

    return await res.json();
  } catch (error) {
    console.error("Error updating client project number:", error);
    throw error;
  }
}

export const getProjectById = async (id) => {
  const res = await fetch(`${API_URL}/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return await res.json();
};