// 1. Se crean las variables para poder usar las variables de html pero ahora en JavaScript
// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);


    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        // console.log('vaciando carrito...')
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // Eliminamos todo el HTML
    })
}

// Funciones
function agregarCurso(e) {
    // console.log('Presionando en cursos')
    //console.log(e.target.classList) Para ver que clases tiene el boton al que le estamos dando click
    // contains = Si conteniene tal clase
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito') ){
        // console.log('Agregando al carrito...')
        //console.log(e.target) // Nos va a retornar los datos del boton al que le estamos dando click
        //console.log(e.target.parentElement.parentElement) // Nos accede al padre del padre del boton y nos retorna todos los datos de el
        // Creamos una variable para guardar todos los valores de nuestro boton seleccionado
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    // console.log(e.target.classList) // Para ver las clases que forman nuestro contenedor
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina el arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id != cursoId);

        // console.log(articulosCarrito);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}
// Lee el contenido del HTML al que le dimos click y extrae la infomracion del curso
function leerDatosCurso(curso) {
    console.log(curso);

    // Crear un objeto para guardar los datos del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src, 
        titulo: curso.querySelector('h4').textContent, 
        precio: curso.querySelector('.precio span').textContent, 
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1
    }


    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id ); // Va a returnar false / true por defauld
    // console.log(existe); // Lo colocamos para que la consola nos imprimiera true / false dependiendo si existia el nuevo curso en el arreglo del carrito de compras
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => { // map creara un nuevo arreglo
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    //console.log(infoCurso) // Nos sirve para ver como se va formando nuestro arreglo con todos los datos de nuestro curso
    // Agregar elementos al arreglo de carrito
    // articulosCarrito = [...articulosCarrito, infoCurso];

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href='#' class="borrar-curso" data-id="${curso.id}" > X </a>
            </td>
            
        `;

        // Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}
// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = ''; // innerHTML es una forma de poder acceder a nuestro html

    // Lo que realiza este codigo es que mientras nuestro contenedor contenga un hijo los estara removiendo con la funcion removeChild ya cuando vea que no hay nada se detendra y te permitira continuar con tu programa
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}