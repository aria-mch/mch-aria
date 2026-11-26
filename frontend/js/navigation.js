
// Inicializar navegación y formulario
document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('formulario-solicitud');
    const mensajeFormulario = document.getElementById('mensaje-formulario');

    formulario.addEventListener('submit', async (event) => {

        // Evitar que el navegador recargue la página
        event.preventDefault();

        // Obtener datos del formulario
        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            id_servicio: document.getElementById('id_servicio').value,
            mensaje: document.getElementById('mensaje').value.trim()
        };

        try {

            mensajeFormulario.textContent = 'Enviando solicitud...';

            // Enviar datos al backend
            const resultado = await enviarSolicitud(datos);

            mensajeFormulario.textContent = resultado.message;

            // Limpiar formulario
            formulario.reset();

        } catch (error) {

            mensajeFormulario.textContent = error.message;

        }

    });

});
