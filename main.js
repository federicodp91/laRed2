  //------------------------FORMULARIO CONTACTO-----------------

  // Evento en el formulario
  let miFormulario = document.querySelector(".formulario")
  miFormulario.addEventListener("submit", validarFormulario);

  function validarFormulario(e){
  e.preventDefault();
  let formulario = e.target
  console.log(formulario.children[2].value); 
  console.log(formulario.children[3].value); 
  console.log(formulario.children[4].value); 
  console.log(formulario.children[5].value);
  Swal.fire('Formulario enviado con éxito', '', 'success')
  miFormulario.reset()
  } 


  // Guardar en Local Storage

  function guardarDatos(){
  let nombre = document.querySelector("#nombres").value;
  let apellido = document.querySelector("#apellidos").value;
  let correo = document.querySelector("#correo").value;
  let mensaje = document.querySelector("#texto").value;

  localStorage.setItem("Nombre", nombre);
  localStorage.setItem("Apellido", apellido);
  localStorage.setItem("correo", correo);
  localStorage.setItem("texto", mensaje);
  }

  let enviarButton = document.querySelector("#enviar");
  enviarButton.addEventListener("click", guardarDatos) 


  // Validar Formulario  con jquery

  $(document).ready(function() {



  $("#sec-cuatro").validate();

  });

  // -----------------------CARRITO DE COMPRAS----------------------------------------------------



  let carrito = [];

  // Capturamos los botones de "Añadir al carrito"
  const botonesAgregar = document.querySelectorAll('.btn-agregar');

  // Iteramos sobre los botones y agregamos un listener de click a cada uno
  botonesAgregar.forEach((botonAgregar) => {
  botonAgregar.addEventListener('click', () => {

  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: '¡Se agregó al carrito!',
  showConfirmButton: false,
  timer: 1500
  })


  



  
  // Capturamos la información del producto
  const cardBody = botonAgregar.parentNode;
  const imgProducto = cardBody.previousElementSibling;
  const nombreProducto = cardBody.querySelector('.card-title').textContent;
  const precioProducto = cardBody.querySelector('.card-text').textContent;
  const cantidadProducto = cardBody.querySelector('input[type="number"]').value;

  // Verificamos si el producto ya se encuentra en el carrito
  const productoExistente = carrito.find((producto) => producto.nombre === nombreProducto);
  if (productoExistente) {
  // Actualizamos la cantidad del producto existente
  productoExistente.cantidad += parseInt(cantidadProducto);
  } else {
  // Agregamos el nuevo producto al carrito
  const nuevoProducto = {
  img: imgProducto.src,
  nombre: nombreProducto,
  precio: parseFloat(precioProducto.replace('$', '').replace('.', '')),
  cantidad: parseInt(cantidadProducto),
  };
  carrito.push(nuevoProducto);
  }

  // Renderizamos el carrito de compras
  renderizarCarrito();


  // Agregamos un listener de click al botón de finalizar compra
  botonCompra.addEventListener('click', () => {
  // Lógica para finalizar la compra aquí
  console.log('Compra finalizada');
  });
  });
  });


  // Función para renderizar el carrito de compras
  function renderizarCarrito() {
  // Capturamos el elemento donde se mostrará el carrito
  const carritoElemento = document.querySelector('#offcanvasRight .offcanvas-body');

  // Limpiamos el contenido previo del carrito
  carritoElemento.innerHTML = '';


  // Creamos los elementos HTML para los títulos
  const titulosElemento = document.createElement('div');
  titulosElemento.classList.add('d-flex', 'align-items-center', 'mb-3', 'fw-bold');


  const nombreElemento = document.createElement('div');
  nombreElemento.textContent = '|PRODUCTO 🍷|';
  nombreElemento.style.flex = '1';
  titulosElemento.appendChild(nombreElemento);

  const cantidadElemento = document.createElement('div');
  cantidadElemento.textContent = '|Un|';
  cantidadElemento.style.width = '50px';
  titulosElemento.appendChild(cantidadElemento);



  const precioElemento = document.createElement('div');
  precioElemento.textContent = '|Precio|';
  precioElemento.style.width = '80px';
  titulosElemento.appendChild(precioElemento);

  const subtotalElemento = document.createElement('div');
  subtotalElemento.textContent = '|Subtotal|';
  subtotalElemento.style.width = '80px';
  titulosElemento.appendChild(subtotalElemento);

  carritoElemento.appendChild(titulosElemento);

  // Creamos los elementos HTML para cada producto en el carrito
  let subtotal = 0;
  carrito.forEach((producto) => {
  const productoElemento = document.createElement('div');
  productoElemento.classList.add('d-flex', 'align-items-center', 'mb-3');

  const imagenElemento = document.createElement('img');
  imagenElemento.src = producto.img;
  imagenElemento.style.width = '50px';
  imagenElemento.style.height = 'auto';
  productoElemento.appendChild(imagenElemento);

  const nombreElemento = document.createElement('div');
  nombreElemento.textContent = producto.nombre;
  nombreElemento.style.flex = '1';
  productoElemento.appendChild(nombreElemento);

  const cantidadElemento = document.createElement('div');
  cantidadElemento.textContent = producto.cantidad;
  cantidadElemento.style.width = '50px';
  productoElemento.appendChild(cantidadElemento);

  const precioElemento = document.createElement('div');
  precioElemento.textContent = `$${producto.precio.toLocaleString('en-US')}`;
  precioElemento.style.width = '80px';
  productoElemento.appendChild(precioElemento);

  const subtotalProducto = producto.precio * producto.cantidad;
  subtotal += subtotalProducto;

  const subtotalElemento = document.createElement('div');
  subtotalElemento.textContent = `$${subtotalProducto.toLocaleString('en-US')}`;
  subtotalElemento.style.width = '80px';
  productoElemento.appendChild(subtotalElemento);

  carritoElemento.appendChild(productoElemento);
  });

  // Creamos el elemento HTML para el total del carrito
  const totalElemento = document.createElement('div');
  totalElemento.classList.add('d-flex', 'align-items-center', 'mb-3', 'fw-bold');
  totalElemento.style.justifyContent = 'flex-end';
  totalElemento.style.fontSize = '1.2rem';

  // Agregamos el valor del subtotal al elemento del total
  totalElemento.textContent = `Total: $${subtotal.toLocaleString('en-US')};`

  // Agregamos el elemento del total al carrito
  carritoElemento.appendChild(totalElemento);
}



    {
      $('#finCompra').click( function finalizarCompra() {
        return new Promise((resolve, reject) => {
        // Lógica para finalizar la compra aquí
  
        Swal.fire({
          title: '¿Estas Seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Pagar 💲'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              '¡Felicitaciones!',
              'Su compra se realizó con éxito, recibiras un mail de confirmación a la brevedad.',
              'success'
            )
            resolve(); // Resolvemos la promesa si el usuario confirmó la compra
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error en el pago',
              text: 'Se cancela la compra',
            })
            reject(); // Rechazamos la promesa si el usuario canceló la compra
          }
        })
      });
    });
  }

const btnVaciarCarrito = document.querySelector('#vaciar-carrito');

btnVaciarCarrito.addEventListener('click', () => {
  carrito = [];
  renderizarCarrito();
});














