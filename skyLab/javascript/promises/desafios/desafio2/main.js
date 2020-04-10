var nome = '';
var listElement = document.querySelector('ul');
var inputElement = document.querySelector('input');

var button = document.querySelector("button");
button.onclick = function() {
    listElement.innerHTML = ' ';
    nome = document.querySelector("#nome");
    listRepositories(nome.value);
}

function renderRepositories(repositories){
  listElement.innerHTML = ' ';
  for(repo of repositories){
      const textElement = document.createTextNode(repo.name);
      const liElement = document.createElement('li');
      liElement.appendChild(textElement);
      listElement.appendChild(liElement);
  }
}

function listRepositories(nome){
    if(!nome) return;
    const textElement = document.createTextNode("Carregando...");
    const liElement = document.createElement('li');
    liElement.appendChild(textElement);
    listElement.appendChild(liElement);

    setTimeout(function(){ 
      axios.get('https://api.github.com/users/' + nome + '/repos')
        .then(function (response) {
          renderRepositories(response.data);
        })
        .catch(function(error) {
          if (error.response.status === 404)
            listElement.innerHTML = ' ';
            alert("Este usuário não existe no git!")
        });
    }, 2000);

    
}