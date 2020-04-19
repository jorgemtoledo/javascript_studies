import React, { useState, useEffect } from 'react';
import api from './services/app';

import './App.css';
import backgroundImage from './assets/photo-1571211060011-f7989adae130.jpeg';

import Header from './components/Header';

function App() { 
  // const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);
  const [projects, setProjects] = useState([]);

  useEffect( () => {
    api.get('projects').then(response => {
      // console.log(response);
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // projects.push(`Novo projeto ${Date.now()}`);
    // setProjects([...projects,  `Novo projeto ${Date.now()}`]);
    // console.log(projects);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Eu',
    });

    const project = response.data;

    setProjects([...projects, project]);

  }
  return (
    <>
      <Header title='Project'  />

      {/* <img width={300} src={backgroundImage} /> */}


      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App;