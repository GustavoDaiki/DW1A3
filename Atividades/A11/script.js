const form = document.getElementById('githubForm');
const userInfoDiv = document.getElementById('userInfo');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      const userInfo = `
        <h2>${data.name}</h2>
        <p>Repositórios: ${data.public_repos}</p>
        <p>Seguidores: ${data.followers}</p>
      `;
      userInfoDiv.innerHTML = userInfo;
    })
    .catch(error => {
      userInfoDiv.innerHTML = "<p>Erro ao obter informações do usuário.</p>";
    });
});
