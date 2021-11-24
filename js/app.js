import{campoRequerido,validarNumeros,validarURL,validarGeneral} from './validaciones.js'
import{Producto} from './productoClass.js';



//traer el elemento requerido desde el html
let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#producto');
let campoDescripcion = document.querySelector('#descripcion');
let campoCantidad = document.querySelector('#cantidad');
let campoURL = document.querySelector('#url');
let formularioProducto = document.querySelector('#formProducto');
//si hay algo en el arreglo, quiero guardarlo. Si no, que sea un arreglo vacio.
let listaProductos = JSON.parse(localStorage.getItem('arregloProductosKey')) || [];
console.log(listaProductos)

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

//llamo a carga inicial
cargaInicial();

function guardarProducto(e){
    // verificar que todos los datos sean validados
        e.preventDefault()
        if(validarGeneral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoURL)){
            //crear un producto
            crearProducto();
        }
    
}

function crearProducto(){
    // crear un objeto producto
    let productoNuevo =new Producto(campoCodigo.value, campoProducto.value, campoDescripcion.value,campoCantidad.value,campoURL.value);
    //guardar el obj dentro del arreglo del producto
    listaProductos.push(productoNuevo);
    console.log(listaProductos)
    //limpiar formulario
    limpiarFormulario();
    //guardar el arreglo en localStorage
    guardarLocalStorage();
    //mostrar un cartel al usuario!
    Swal.fire(
        'Producto cargado con exito',
        'Capo',
        'success'
      )
      //cargar el producto en la tabla
      crearFila(productoNuevo);

}

function limpiarFormulario(){
    formularioProducto.reset();
    //resetear las clases
    campoCodigo.className = 'form-control'
    campoProducto.className = 'form-control'
    campoDescripcion.className = 'form-control'
    campoCantidad.className = 'form-control'
    campoURL.className = 'form-control'
}

function guardarLocalStorage() {
    localStorage.setItem('arregloProductosKey', JSON.stringify(listaProductos))
}

function crearFila(producto){
    let tablaProductos = document.getElementById('tablaProductos');
    tablaProductos.innerHTML += `<tr>
    <th scope="row">${producto.codigo}</th>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
        <button class="btn btn-warning" onclick='prepararEdicionProducto()' type="submit">Editar</button> <br>
        <button class="btn btn-danger" type="submit">Borrar</button>
    </td>

</tr>`
}

function cargaInicial(){
    if(listaProductos.lenght > 0 ){
        //crear filas
        listaProductos.forEach((itemProducto) => {crearFila(itemProducto)});
    }
}

window.prepararEdicionProducto = function (){
    console.log('desde editar')
}