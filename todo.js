const lista = document.getElementById('ft_list');

function salvar() {
  const tarefas = Array.from(lista.children, tarefa => tarefa.textContent);
  document.cookie = 'tarefas=' + encodeURIComponent(JSON.stringify(tarefas)) + '; max-age=31536000; path=/; SameSite=Lax';
}

function criarTarefa(texto) {
  const tarefa = document.createElement('div');
  tarefa.textContent = texto;

  tarefa.onclick = function () {
    if (confirm('Deseja remover esta tarefa?')) {
      tarefa.remove();
      salvar();
    }
  };

  lista.prepend(tarefa);
}

function adicionarTarefa() {
  const texto = prompt('Digite uma tarefa:');

  if (texto && texto.trim()) {
    criarTarefa(texto.trim());
    salvar();
  }
}

const cookie = document.cookie.split('; ').find(item => item.startsWith('tarefas='));

if (cookie) {
  try {
    const tarefas = JSON.parse(decodeURIComponent(cookie.substring(8)));
    if (Array.isArray(tarefas)) tarefas.reverse().forEach(criarTarefa);
  } catch (erro) {
    console.error('Não foi possível carregar as tarefas.', erro);
  }
}
