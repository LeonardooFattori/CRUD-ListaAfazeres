let contadorUsuario = 1;

function addUser(nomeUsuario = '', urlImagem = '', tarefas = []) {
  if (!nomeUsuario) {
    nomeUsuario = document.getElementById('nomeUsuario').value;
    urlImagem = document.getElementById('urlImagem').value;
  }

  if (!nomeUsuario) {
    alert("Digite o nome do usuário.");
    return;
  }

  const idUsuario = contadorUsuario++;

  const usuario = {
    id: idUsuario,
    nome: nomeUsuario,
    imagem: urlImagem,
    tarefas: tarefas
  };

  const cardUsuario = document.createElement('div');
  cardUsuario.className = 'usuarioCard';
  cardUsuario.id = `usuario-${usuario.id}`;

  const headerUsuario = document.createElement('div');
  headerUsuario.className = 'headerUsuario';

  const infoUsuario = document.createElement('div');
  infoUsuario.style.display = 'flex';
  infoUsuario.style.alignItems = 'center';

  const imagemUsuarioElem = document.createElement('img');
  imagemUsuarioElem.src = usuario.imagem || 'https://via.placeholder.com/50';
  imagemUsuarioElem.alt = `${usuario.nome}`;

  const nomeUsuarioElem = document.createElement('h4');
  nomeUsuarioElem.textContent = usuario.nome;

  infoUsuario.appendChild(imagemUsuarioElem);
  infoUsuario.appendChild(nomeUsuarioElem);

  const botaoRemoverUsuario = document.createElement('button');
  botaoRemoverUsuario.textContent = '🗑️';
  botaoRemoverUsuario.addEventListener('click', function () {
    deletarUsuario(usuario.id);
  });

  headerUsuario.appendChild(infoUsuario);
  headerUsuario.appendChild(botaoRemoverUsuario);
  cardUsuario.appendChild(headerUsuario);

  const listaTarefas = document.createElement('ul');
  listaTarefas.className = 'listaTarefas';

  for (let i = 0; i < usuario.tarefas.length; i++) {
    const tarefa = usuario.tarefas[i];
    const itemTarefa = criarItemTarefa(tarefa);
    listaTarefas.appendChild(itemTarefa);
  }

  cardUsuario.appendChild(listaTarefas);

  const formTarefa = document.createElement('form');
  formTarefa.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputTarefa = formTarefa.querySelector('input[type="text"]');
    const textoTarefa = inputTarefa.value;

    if (!textoTarefa) {
      alert("Digite uma tarefa.");
      return;
    }

    const itemTarefa = criarItemTarefa(textoTarefa);
    listaTarefas.appendChild(itemTarefa);
    inputTarefa.value = '';
  });

  const inputTarefa = document.createElement('input');
  inputTarefa.type = 'text';
  inputTarefa.placeholder = 'Nova Tarefa';

  const botaoAdicionarTarefa = document.createElement('button');
  botaoAdicionarTarefa.type = 'submit';
  botaoAdicionarTarefa.textContent = '+ Adicionar Tarefa';

  formTarefa.appendChild(inputTarefa);
  formTarefa.appendChild(botaoAdicionarTarefa);

  cardUsuario.appendChild(formTarefa);

  document.getElementById('containerUsuarios').appendChild(cardUsuario);

  document.getElementById('formularioAdicionarUsuario').reset();
}

function deletarUsuario(idUsuario) {
  const usuarioCard = document.getElementById(`usuario-${idUsuario}`);
  if (usuarioCard) {
    usuarioCard.remove();
  }
}

function criarItemTarefa(textoTarefa) {
  const itemTarefa = document.createElement('li')

  const spanTarefa = document.createElement('span')
  spanTarefa.textContent = textoTarefa

  const botaoEditar = document.createElement('button')
  botaoEditar.classList.add('editar')
  botaoEditar.textContent = '✏️'
  botaoEditar.addEventListener('click', function () {
    const novoTexto = prompt('Edite a tarefa:', textoTarefa)
    if (novoTexto) {
      spanTarefa.textContent = novoTexto;
    }
  });

  const botaoRemover = document.createElement('button')
  botaoRemover.classList.add('remover')
  botaoRemover.textContent = '🗑️'
  botaoRemover.addEventListener('click', function () {
    itemTarefa.remove();
  });

  itemTarefa.appendChild(spanTarefa)
  itemTarefa.appendChild(botaoEditar)
  itemTarefa.appendChild(botaoRemover)

  return itemTarefa;
}

window.onload = function () {
  addUser('Andreia Mattos', 'https://cdn-icons-png.flaticon.com/512/149/149071.png', [
      'Estudar NodeJS',
      'Estudar Git',
      'Estudar Javascript'
  ]);
  
  document.getElementById('formularioAdicionarUsuario').addEventListener('submit', function(event) {
    event.preventDefault();
    addUser();
  });
};