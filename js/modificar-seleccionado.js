//const URL = "http://127.0.0.1:5000/"
const URL = "https://guillermorobba.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            imagen_url: '',
            imagenUrlTemp: null,
            imagenSeleccionada: null,
            mostrarDatosSeleccionado: false,
        };
    },

    methods: {
        obtenerSeleccionado() {
            fetch(URL + 'seleccionados/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los datos del seleccionado.')
                    }
                })
                .then(data => {
                    //let ruta = "http://127.0.0.1:5000/static/img/";
                    const ruta = "https://www.pythonanywhere.com/user/guillermorobba/files/home/guillermorobba/mysite/static/img/"
                    this.nombre = data.nombre;
                    this.imagen_url = ruta + data.bandera;
                    this.mostrarDatosSeleccionado = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = globalThis.URL.createObjectURL(file);
        },

        guardarCambios() {
            let formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombre', this.nombre);

            if (this.imagenSeleccionada) {
                formData.append('bandera', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }
            console.log('formData:', formData)
            fetch(URL + 'seleccionados/' + this.codigo, {
                method: 'PUT',
                //mode: 'cors',
                //headers: {
                  //  'Content-Type': 'multipart/form-data'
                  //  'Access-Control-Allow-Origin':'*'
                  //},
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error al guardar los cambios del seleccionado.')
                }
            })
            .then(data => {
                alert('Seleccionado actualizado correctamente.');
                this.limpiarFormulario();
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error al actualizar el seleccionado.");
            });
        },

        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.imagenSeleccionada = null;
            this.imagenUrlTemp = null;
            this.mostrarDatosSeleccionado = false;
        }
    }
});

app.mount('#app');