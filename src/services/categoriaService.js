const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api'

const CATEGORIAS_URL = `${API_BASE_URL}/categorias`

async function procesarRespuesta(response) {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type')
  const contieneJson = contentType?.includes('application/json')

  const contenido = contieneJson
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const mensaje =
      contenido?.mensaje ||
      contenido?.message ||
      contenido?.error ||
      'No fue posible completar la operación.'

    const error = new Error(mensaje)
    error.status = response.status
    error.detalles = contenido?.errores || contenido

    throw error
  }

  return contenido
}

async function realizarSolicitud(url, opciones = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...opciones.headers,
      },
      ...opciones,
    })

    return await procesarRespuesta(response)
  } catch (error) {
    if (error.status) {
      throw error
    }

    const errorConexion = new Error(
      'No fue posible conectar con el servidor. Verifica que la API esté activa en el puerto 8081.',
    )

    errorConexion.cause = error
    throw errorConexion
  }
}

export function listarCategorias() {
  return realizarSolicitud(CATEGORIAS_URL)
}

export function consultarCategoria(idCategoria) {
  return realizarSolicitud(`${CATEGORIAS_URL}/${idCategoria}`)
}

export function registrarCategoria(categoria) {
  return realizarSolicitud(CATEGORIAS_URL, {
    method: 'POST',
    body: JSON.stringify(categoria),
  })
}

export function actualizarCategoria(idCategoria, categoria) {
  return realizarSolicitud(`${CATEGORIAS_URL}/${idCategoria}`, {
    method: 'PUT',
    body: JSON.stringify(categoria),
  })
}

export function eliminarCategoria(idCategoria) {
  return realizarSolicitud(`${CATEGORIAS_URL}/${idCategoria}`, {
    method: 'DELETE',
  })
}