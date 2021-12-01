import{campoRequerido,validarNumeros,validarURL,validarGeneral} from "./validaciones.js"
import{Producto} from "./productoClass.js";



//traer el elemento requerido desde el html
let campoCodigo = document.querySelector('#codigo');
let campoProducto = document.querySelector('#producto');
let campoDescripcion = document.querySelector('#descripcion');
let campoCantidad = document.querySelector('#cantidad');
let campoURL = document.querySelector('#url');
let formularioProducto = document.querySelector('#formProducto');
//si hay algo en el arreglo, quiero guardarlo. Si no, que sea un arreglo vacio.
let listaProductos = JSON.parse(localStorage.getItem('arregloProductosKey')) || [];
let productoExistente = false; // si productoExistente es false, quiero crear, si es true entonces quiero modificar un producto existente.
let btnNuevo = document.getElementById('btnNuevo')



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
btnNuevo.addEventListener('click',limpiarFormulario);

//llamo a carga inicial
cargaInicial();

function guardarProducto(e){
    // verificar que todos los datos sean validados
        e.preventDefault()
        if(validarGeneral(campoCodigo,campoProducto,campoDescripcion,campoCantidad,campoURL)){
            if(productoExistente == false){
            //crear un producto
            crearProducto();
            }else{
            modificarProducto();
            }
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
        'Sos un capo',
        'success'
      );
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
    productoExistente = false;
}

function guardarLocalStorage() {
    localStorage.setItem('arregloProductosKey', JSON.stringify(listaProductos))
}

function crearFila(producto){
    let tablaProductos = document.getElementById('tablaProductos');
    tablaProductos.innerHTML += `<tr>
    <td>${producto.codigo}</td>
    <td>${producto.producto}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.url}</td>
    <td>
        <button class="btn btn-warning" onclick='prepararEdicionProducto("${producto.codigo}")'>Editar</button> <br>
        <button class="btn btn-danger"  onclick='borrarProducto("${producto.splice}")'>Borrar</button>
    </td>
</tr>`;
}

function cargaInicial(){
    if(listaProductos.length > 0 ){
        //crear filas
        listaProductos.forEach((itemProducto) => {crearFila(itemProducto)});
    }
}

window.prepararEdicionProducto = function (codigo){
    console.log('desde editar')
    console.log(codigo)
    //buscar el producto en el arreglo
    let productoBuscado = listaProductos.find((itemProducto)=>{return itemProducto.codigo == codigo})
    console.log(productoBuscado)
    //mostrar el producto en el formulario
    campoCodigo.value = productoBuscado.codigo;
    campoProducto.value = productoBuscado.producto;
    campoDescripcion.value = productoBuscado.descripcion;
    campoCantidad.value = productoBuscado.cantidad;
    campoURL.value = productoBuscado.url;

    productoExistente=true
}

function modificarProducto(){
    console.log('desde modificar producto')
    //encontrar la posicion del elemento que quiero modificar dentro del arreglo del producto
    let posicionObjetoBuscado = listaProductos.findIndex((itemProducto)=>{return itemProducto.codigo === campoCodigo.value });
    console.log(posicionObjetoBuscado)
    //modificar los valores del arreglo
    listaProductos[posicionObjetoBuscado].producto =campoProducto.value
    listaProductos[posicionObjetoBuscado].descripcion =campoDescripcion.value
    listaProductos[posicionObjetoBuscado].url = campoURL.value;
    listaProductos[posicionObjetoBuscado].cantidad = campoCantidad.value;

    //actualizar el localstorage

    guardarLocalStorage();
    //actualizar la tabla
    borrarTabla();
    cargaInicial();
    //MOSTRAR UN CARTEL
    Swal.fire(
        'El producto fue actualizado',
        'Sos un capo',
        'success'
      )
    //LIMPIAR FORMULARIO
    limpiarFormulario()
}

function borrarTabla(){
    let tbodyProductos = document.querySelector('#tablaProductos');
    tbodyProductos.innerHTML ='';
}

window.borrarProducto = function(codigo){
    console.log(codigo);
    //buscar posicion del elemento en el arreglo y borrarlo.
    let arregloNuevo = listaProductos.filter((item)=>{return item.codigo != codigo});
   // console.log(arregloNuevo);
   listaProductos = arregloNuevo;
   guardarLocalStorage();
   //actualizar la tabla
   borrarTabla();
   cargaInicial();
   //mostrar cartel al usuario
   Swal.fire(
    'Producto eliminado',
    'Al final no eras tan capo',
    'success'
  )

}