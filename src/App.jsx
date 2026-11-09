import { useEffect, useMemo, useState } from 'react'
import './App.css'

import Encabezado from './components/Encabezado'
import MenuLateral from './components/MenuLateral'
import ModalConfirmacion from './components/ModalConfirmacion'
import PanelCategorias from './components/PanelCategorias'
import PiePagina from './components/PiePagina'

import {
  actualizarCategoria,
  eliminarCategoria,
  listarCategorias,
  registrarCategoria,
} from './services/categoriaService'

const FORMULARIO_INICIAL = {
  nombre: '',
  descripcion: '',
  activo: true,
}

const MENSAJE_INICIAL = {
  tipo: 'informacion',
  texto: '',
}

function App() {
  const [categorias, setCategorias] = useState([])
  const [criterioBusqueda, setCriterioBusqueda] = useState('')
  const [formulario, setFormulario] = useState(
    FORMULARIO_INICIAL,
  )
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(MENSAJE_INICIAL)
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState(null)
  const [categoriaAEliminar, setCategoriaAEliminar] =
    useState(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [moduloActivo, setModuloActivo] =
    useState('categorias')

  useEffect(() => {
    let componenteActivo = true

    async function cargarCategorias() {
      setCargando(true)

      try {
        const datos = await listarCategorias()

        if (componenteActivo) {
          setCategorias(
            Array.isArray(datos) ? datos : [],
          )
        }
      } catch (error) {
        if (componenteActivo) {
          setMensaje({
            tipo: 'error',
            texto: error.message,
          })
        }
      } finally {
        if (componenteActivo) {
          setCargando(false)
        }
      }
    }

    cargarCategorias()

    return () => {
      componenteActivo = false
    }
  }, [])

  const categoriasFiltradas = useMemo(() => {
    const criterio = criterioBusqueda
      .trim()
      .toLocaleLowerCase('es')

    if (!criterio) {
      return categorias
    }

    return categorias.filter((categoria) => {
      const nombre = categoria.nombre
        ?.toLocaleLowerCase('es')
        .includes(criterio)

      const descripcion = categoria.descripcion
        ?.toLocaleLowerCase('es')
        .includes(criterio)

      return nombre || descripcion
    })
  }, [categorias, criterioBusqueda])

  function handleCambiarFormulario(event) {
    const { name, value, type, checked } = event.target

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: '',
    }))
  }

  function validarFormulario() {
    const nuevosErrores = {}
    const nombre = formulario.nombre.trim()
    const descripcion = formulario.descripcion.trim()

    if (!nombre) {
      nuevosErrores.nombre =
        'El nombre de la categoría es obligatorio.'
    } else if (nombre.length > 100) {
      nuevosErrores.nombre =
        'El nombre no puede superar los 100 caracteres.'
    }

    if (!descripcion) {
      nuevosErrores.descripcion =
        'La descripción de la categoría es obligatoria.'
    } else if (descripcion.length > 255) {
      nuevosErrores.descripcion =
        'La descripción no puede superar los 255 caracteres.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  function limpiarFormulario() {
    setFormulario(FORMULARIO_INICIAL)
    setCategoriaSeleccionada(null)
    setErrores({})
  }

  function aplicarErroresServidor(error) {
    if (
      error.detalles &&
      typeof error.detalles === 'object' &&
      !Array.isArray(error.detalles)
    ) {
      setErrores(error.detalles)
    }

    setMensaje({
      tipo: 'error',
      texto: error.message,
    })
  }

  async function handleGuardar() {
    if (!validarFormulario()) {
      setMensaje({
        tipo: 'advertencia',
        texto:
          'Revisa los campos señalados antes de continuar.',
      })

      return
    }

    const categoria = {
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      activo: formulario.activo,
    }

    setGuardando(true)
    setMensaje(MENSAJE_INICIAL)

    try {
      if (categoriaSeleccionada) {
        const categoriaActualizada =
          await actualizarCategoria(
            categoriaSeleccionada.idCategoria,
            categoria,
          )

        setCategorias((categoriasActuales) =>
          categoriasActuales.map((registro) =>
            registro.idCategoria ===
            categoriaActualizada.idCategoria
              ? categoriaActualizada
              : registro,
          ),
        )

        setMensaje({
          tipo: 'exito',
          texto:
            'La categoría fue actualizada correctamente.',
        })
      } else {
        const categoriaRegistrada =
          await registrarCategoria(categoria)

        setCategorias((categoriasActuales) => [
          ...categoriasActuales,
          categoriaRegistrada,
        ])

        setMensaje({
          tipo: 'exito',
          texto:
            'La categoría fue registrada correctamente.',
        })
      }

      limpiarFormulario()
    } catch (error) {
      aplicarErroresServidor(error)
    } finally {
      setGuardando(false)
    }
  }

  function handleEditar(categoria) {
    setCategoriaSeleccionada(categoria)

    setFormulario({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      activo: categoria.activo,
    })

    setErrores({})
    setMensaje(MENSAJE_INICIAL)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleSolicitarEliminacion(categoria) {
    setCategoriaAEliminar(categoria)
  }

  async function handleConfirmarEliminacion() {
    if (!categoriaAEliminar) {
      return
    }

    setEliminando(true)
    setMensaje(MENSAJE_INICIAL)

    try {
      await eliminarCategoria(
        categoriaAEliminar.idCategoria,
      )

      setCategorias((categoriasActuales) =>
        categoriasActuales.filter(
          (categoria) =>
            categoria.idCategoria !==
            categoriaAEliminar.idCategoria,
        ),
      )

      if (
        categoriaSeleccionada?.idCategoria ===
        categoriaAEliminar.idCategoria
      ) {
        limpiarFormulario()
      }

      setMensaje({
        tipo: 'exito',
        texto:
          'La categoría fue eliminada correctamente.',
      })

      setCategoriaAEliminar(null)
    } catch (error) {
      aplicarErroresServidor(error)
    } finally {
      setEliminando(false)
    }
  }

  function handleSeleccionarModulo(modulo) {
    setModuloActivo(modulo.id)

    if (!modulo.disponible) {
      setMensaje({
        tipo: 'informacion',
        texto:
          `${modulo.nombre} se desarrollará ` +
          'en un próximo incremento.',
      })
    } else {
      setMensaje(MENSAJE_INICIAL)
    }
  }

  const contenidoPrincipal =
    moduloActivo === 'categorias' ? (
      <PanelCategorias
        categorias={categoriasFiltradas}
        criterioBusqueda={criterioBusqueda}
        formulario={formulario}
        errores={errores}
        mensaje={mensaje}
        cargando={cargando}
        guardando={guardando}
        editando={Boolean(categoriaSeleccionada)}
        onCambiarBusqueda={setCriterioBusqueda}
        onCambiarFormulario={handleCambiarFormulario}
        onGuardar={handleGuardar}
        onCancelarEdicion={limpiarFormulario}
        onEditar={handleEditar}
        onEliminar={handleSolicitarEliminacion}
        onCerrarMensaje={() =>
          setMensaje(MENSAJE_INICIAL)
        }
      />
    ) : (
      <main
        className="modulo-proximo"
        id="contenido-principal"
      >
        <p className="modulo-proximo__etiqueta">
          Hoja de ruta del producto
        </p>

        <h2 className="modulo-proximo__titulo">
          Próximo incremento
        </h2>

        <p className="modulo-proximo__descripcion">
          Este módulo forma parte de la arquitectura general
          del Sistema RFID y será implementado en un siguiente
          incremento funcional.
        </p>
      </main>
    )

  return (
    <div className="aplicacion">
      <MenuLateral
        moduloActivo={moduloActivo}
        abierto={menuAbierto}
        onSeleccionar={handleSeleccionarModulo}
        onCerrar={() => setMenuAbierto(false)}
      />

      <div className="aplicacion__contenido">
        <Encabezado
          onAbrirMenu={() => setMenuAbierto(true)}
        />

        {contenidoPrincipal}

        <PiePagina />
      </div>

      <ModalConfirmacion
        abierto={Boolean(categoriaAEliminar)}
        titulo="Eliminar categoría"
        mensaje={
          categoriaAEliminar
            ? `¿Confirmas la eliminación de la categoría “${categoriaAEliminar.nombre}”? Esta acción no se puede deshacer.`
            : ''
        }
        textoConfirmar="Eliminar categoría"
        procesando={eliminando}
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setCategoriaAEliminar(null)}
      />
    </div>
  )
}

export default App