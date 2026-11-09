function IndicadorCarga({
  visible = false,
  mensaje = 'Cargando información...',
}) {
  if (!visible) {
    return null
  }

  return (
    <div
      className="indicador-carga"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span
        className="indicador-carga__spinner"
        aria-hidden="true"
      />

      <span className="indicador-carga__mensaje">
        {mensaje}
      </span>
    </div>
  )
}

export default IndicadorCarga