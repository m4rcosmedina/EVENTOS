function campoRequerido(){
    console.log('Desde la funcion campo requerido');

if(campoCodigo.value.length > 0){
    console.log('aqui esta todo ok')
}else{
    console.log('aqui esta todo mal')
}

}

//traer el elemento requerido desde el html
let campoCodigo = document.querySelector('#codigo');
console.log(campoCodigo);

// asociar un evento a un elemento html
campoCodigo.addEventListener('blur',campoRequerido) // cuando la funcion no tiene parametros,cono solo poner el nombre de la funcion es necesario. Si no, debemos poner una funcion anonima, y ahi llamar a la nueva funcion
