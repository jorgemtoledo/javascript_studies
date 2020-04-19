import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);
  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Teste meu repo',
      url: 'https://github.com/myrepository/meu',
      techs: ['NodeJs', 'Ruby', 'Javascript', 'React']
    });
    setRepositories([...respositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`respositories/${id}`);

    setRepositories(respositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {respositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
