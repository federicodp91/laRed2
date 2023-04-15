const form = document.getElementById('login');

form.addEventListener('submit', e => {
  e.preventDefault();
  const username = form.querySelector('#usuario').value;
  const password = form.querySelector('#clave').value;

  new Promise((resolve, reject) => {
    fetch('usuarios.json')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  })
    .then(data => {
      const user = data.find(user => user.username === username && user.password === password);
      if (user) {

        // Redirigir al usuario a la página principal
        window.location.href = './index.html';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Usuario o Contraseña Incorrecta/s',
          text: 'Por favor, ingresar datos válidos',
          footer: '<a href="http://www.google.com">Recuperar Contraseña</a>'
        })
      }
    })
    .catch(error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar datos de usuario',
        text: 'Por favor, intente más tarde',
      })
    });
});