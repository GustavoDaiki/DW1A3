const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

/* localStorage.clear(); */

const validateInput = ({ target }) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled');
    return;
  }

  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

window.onload = () => {
  var jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];

  jogadores.sort((a, b) => a.tempo - b.tempo);

  var historico = document.querySelector('.historico');

  historico.innerHTML = '';

  jogadores.sort((a, b) => a.tempo - b.tempo).forEach(jogador => {
    const jogadorInfo = document.createElement('p');
    jogadorInfo.className = 'jogador-info';  // Adicione esta linha
    jogadorInfo.innerHTML = `${jogador.nome} - ${jogador.tempo}s`;
    historico.appendChild(jogadorInfo);
  });
  
}

