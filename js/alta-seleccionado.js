//const URL = "http://127.0.0.1:5000/"
const URL = "https://guillermorobba.pythonanywhere.com/"


document.getElementById('formulario-seleccionado').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('codigo', document.getElementById('codigo').value);
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('bandera', document.getElementById('bandera').files[0]);

    console.log(formData)

    fetch(URL + 'seleccionados', {
        method:'POST',
        /* headers: new Headers({
            'Content-Type': 'multipart/form-data'
        }),  */
        body:formData
    })

    .then(function (response){
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al agregar el nuevo Seleccionado.');
        }
    })
    
    .then(function () {
        alert('Seleccionado agregado correctamente.');
    })
    .catch(function (error) {
        alert('Error al agregar el Seleccionado.');
        console.error('Error: ', error);
    })
    .finally(function () {
        document.getElementById('codigo').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('bandera').value = "";
    }) ;
})