
document.addEventListener('DOMContentLoaded', () => {

    console.log('MCH Aria - Frontend iniciado');

    cargarServicios();

});

// Obtener servicios desde el backend
async function cargarServicios() {

    const contenedor = document.getElementById('lista-servicios');
    const selector = document.getElementById('id_servicio');

    try {

        const servicios = await obtenerServicios();

        contenedor.innerHTML = '';

        servicios.forEach(servicio => {

            // Crear tarjeta del servicio
            const tarjeta = document.createElement('article');
            tarjeta.classList.add('servicio-card');

            tarjeta.innerHTML = `
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
            `;

            contenedor.appendChild(tarjeta);

            // Agregar opción al formulario
            const opcion = document.createElement('option');

            opcion.value = servicio.id_servicio;
            opcion.textContent = servicio.nombre;

            selector.appendChild(opcion);

        });

    } catch (error) {

        contenedor.textContent = 'No fue posible cargar los servicios. Intenta más tarde.';

        console.error(error);

    }

}
