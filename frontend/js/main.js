
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

            // Asignar un icono según el servicio
            let icono = 'bi-stars';

            if (servicio.nombre.toLowerCase().includes('formateo')) {
                icono = 'bi-laptop';
            } else if (servicio.nombre.toLowerCase().includes('instalación')) {
                icono = 'bi-gear';
            } else if (servicio.nombre.toLowerCase().includes('asesorías')) {
                icono = 'bi-file-earmark-spreadsheet';
            } else if (servicio.nombre.toLowerCase().includes('sitios web')) {
                icono = 'bi-window';
            }

            tarjeta.innerHTML = `
                <div class="servicio-icono">
                    <i class="bi ${icono}"></i>
                </div>

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
