function campoRequerido(input) {
    // console.log('Desde la funcion campo requerido');
    if (input.value.length > 0) {
        //console.log('aqui esta todo ok');
        input.className = 'form-control is-valid';
        return true;
    } else {
        //console.log('aqui esta todo mal');
        input.className = 'form-control is-invalid';
        return false
    }
}

function validarNumeros(input) {
    // crear expresion regular
    let patron = /^[0-9]{1,3}$/;
    //el metodo test devuelve true, false
    // expresionregular.test(texto a validar)
    if (patron.test(input.value)) {
        //cumple con la expreson regular
        input.className = 'form-control is-valid';
        return true;
    } else {
        input.className = 'form-control is-invalid';
        return false;
    }

}

function validarURL(input) {
    // crear expresion regular
    let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

    //el metodo test devuelve true, false
    // expresionregular.test(texto a validar)
    if (patron.test(input.value)) {
        //cumple con la expreson regular
        input.className = 'form-control is-valid';
    } else {
        input.className = 'form-control is-invalid';
    }
}

function validarGeneral(e) {
    //prevenir el actualizar del submit
    e.preventDefault();
    console.log('desde la funcoin validar general');

    let alerta = document.getElementById('msj');

    if (campoRequerido(campoCodigo) &&
        campoRequerido(campoProducto) &&
        campoRequerido(campoDescripcion) &&
        validarNumeros(campoCantidad) &&
        validarURL(campoURL)
    ) {
        console.log('los datos estan listos para ser enviados')
        alerta.className = 'alert alert-info my-5 d-none';
    } else {
        console.log('los datos estan mal');
        alerta.className = 'alert alert-info my-5';
    }
}

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
formularioProducto.addEventListener('submit', validarGeneral);