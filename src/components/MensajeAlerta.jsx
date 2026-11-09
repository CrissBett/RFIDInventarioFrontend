function MensajeAlerta({
  tipo = 'informacion',
  mensaje,
  onCerrar,
}) {
  if (!mensaje) {
    return null
  }

  const rolesPorTipo = {
    exito: 'status',
    informacion: 'status',
    advertencia: 'alert',
    error: 'alert',
  }

  return (
    <div
      className={`mensaje-alerta mensaje-alerta--${tipo}`}
      role={rolesPorTipo[tipo] || 'status'}
      aria-live={tipo === 'error' ? 'assertive' : 'polite'}
    >
      <span className="mensaje-alerta__texto">
        {mensaje}
      </span>

      {onCerrar && (
        <button
          type="button"
          className="mensaje-alerta__cerrar"
          onClick={onCerrar}
          aria-label="Cerrar mensaje"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default MensajeAlerta