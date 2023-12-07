//const URL = "http://127.0.0.1:5000/"
const URL = "https://guillermorobba.pythonanywhere.com/"

const app = Vue.createApp({
    data() {
        return {
            seleccionados: []
        }
    },
    methods: {
        obtenerSeleccionados() {
            fetch(URL + 'seleccionados')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(data => {
                    this.seleccionados = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al obtener los seleccionados.');
                });
        },
        eliminarSeleccionado(codigo) {
            if (confirm('¿Estás seguro de que quieres eliminar este Seleccionado?')) {
                fetch(URL + `seleccionados/${codigo}`, {
                    method:'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        this.seleccionados = this.seleccionados.filter(seleccionado => seleccionado.codigo !== codigo);
                        alert('Seleccionado eliminado correctamente.');
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
            }
        }
    },
    mounted() {
        this.obtenerSeleccionados();
    }
});

app.mount('body')