const API_URL = 'http://localhost:3000/api';

// Obtener los servicios disponibles
async function obtenerServicios() {
    try {
        const respuesta = await fetch(`${API_URL}/servicios`);

        if (!respuesta.ok) {
            throw new Error('No se pudieron obtener los servicios');
        }

        return await respuesta.json();

    } catch (error) {
        console.error('Error al consultar servicios:', error);
        throw error;
    }
}

// Enviar una solicitud
async function enviarSolicitud(datos) {
    try {
        const respuesta = await fetch(`${API_URL}/solicitudes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.message || 'Error al enviar la solicitud');
        }

        return resultado;

    } catch (error) {
        console.error('Error al enviar solicitud:', error);
        throw error;
    }
}