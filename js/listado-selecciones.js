//const URL = "http://127.0.0.1:5000/"
const URL = "https://guillermorobba.pythonanywhere.com/"

fetch(URL + 'seleccionados')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener los seleccionados.')
        }
    })
    .then(function (data) {
        let tablaSeleccionados = document.getElementById('tablaSelecciones')
        //let ruta = "http://127.0.0.1:5000/"
        const ruta = "https://www.pythonanywhere.com/user/guillermorobba/files/home/guillermorobba/mysite/"
        for (let seleccion of data) {
            let fila = document.createElement('tr');
            fila.innerHTML =    '<td>' + seleccion.codigo + '</td>' + 
                                '<td>' + seleccion.nombre + '</td>' + 
                                '<td><img src=https://www.pythonanywhere.com/user/guillermorobba/files/home/guillermorobba/mysite/static/img/' + seleccion.bandera + ' alt="Bandera" style="width:100px;"></td>';

            tablaSeleccionados.appendChild(fila);
        }
    })
    .catch(function (error) {
        alert('Error al consultar Seleccionado');
        console.error('Error: ', error);
    }) 