let listaProductos = JSON.parse(localStorage.getItem('arregloProductosKey')) || [];
console.log(listaProductos)

listaProductos.forEach((item) => {crearColumnas(item)});

function crearColumnas(producto){
    let grilla = document.querySelector('grilla');
    grilla.innerHTML += `<div class="col-sm-3" >
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <img src="${producto.url}"
                class="card-img-top w-200" alt="...">
            <p class="card-text">${producto.descripcion}</p>
            <a href="#" class="btn btn-warning" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#producto1" aria-controls="offcanvasRight">Ver mas detalles</a>
        </div>
    </div>
</div>`
}