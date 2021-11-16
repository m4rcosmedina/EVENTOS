import{campoRequerido,validarNumeros,validarURL,validarGeneral} from './validaciones.js'

//traer el elemento requerido desde el html
let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#producto');
let campoDescripcion = document.querySelector('#descripcion');
let campoCantidad = document.querySelector('#cantidad');
let campoURL = document.querySelector('#url')
let formularioProducto = document.querySelector('#formProducto')

// asociar un evento a un elemento html
campoCodigo.addEventListener('blur', () => {
    campoRequerido(campoCodigo)
}); // cuando la funcion no tiene parametros,cono solo poner el nombre de la funcion es necesario. Si no, debemos poner una funcion anonima, y ahi llamar a la nueva funcion
campoProducto.addEventListener('blur', () => {
    campoRequerido(campoProducto)
});
campoDescripcion.addEventListener('blur', () => {
    campoRequerido(campoDescripcion)
});
campoCantidad.addEventListener('blur', () => {
    validarNumeros(campoCantidad)
});
campoURL.addEventListener('blur', () => {
    validarURL(campoURL)
});
formularioProducto.addEventListener('submit', guardarProducto);

function guardarProducto(e){
    // verificar que todos los datos sean validados
        e.preventDefault()
        if(validarGeneral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoURL)){

            crearProducto();
        }
    //crear un producto
    crearProducto();
}

function crearProducto(){
    // crear un producto
    console.log('aqui tengo que crear el producto')
}