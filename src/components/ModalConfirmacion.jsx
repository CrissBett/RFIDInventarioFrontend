import { useEffect } from 'react'
import BotonAccion from './BotonAccion'

function ModalConfirmacion({
  abierto = false,
  titulo = 'Confirmar acción',
  mensaje,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  procesando = false,
  onConfirmar,
  onCancelar,
}) {
  useEffect(() => {
    if (!abierto) {
      return undefined
    }

    function handleTecla(event) {
      if (event.key === 'Escape' && !procesando) {
        onCancelar()
      }
    }

    document.addEventListener('keydown', handleTecla)

    return () => {
      document.removeEventListener('keydown', handleTecla)
    }
  }, [abierto, procesando, onCancelar])

  if (!abierto) {
    return null
  }

  return (
    <div
      className="modal-confirmacion"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !procesando
        ) {
          onCancelar()
        }
      }}
    >
      <section
        className="modal-confirmacion__contenido"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-confirmacion-titulo"
        aria-describedby="modal-confirmacion-mensaje"
      >
        <h2
          id="modal-confirmacion-titulo"
          className="modal-confirmacion__titulo"
        >
          {titulo}
        </h2>

        <p
          id="modal-confirmacion-mensaje"
          className="modal-confirmacion__mensaje"
        >
          {mensaje}
        </p>

        <div className="modal-confirmacion__acciones">
          <BotonAccion
            variante="secundario"
            onClick={onCancelar}
            disabled={procesando}
          >
            {textoCancelar}
          </BotonAccion>

          <BotonAccion
            variante="peligro"
            onClick={onConfirmar}
            disabled={procesando}
          >
            {procesando ? 'Procesando...' : textoConfirmar}
          </BotonAccion>
        </div>
      </section>
    </div>
  )
}

export default ModalConfirmacion