function Encabezado({
  titulo = 'Sistema RFID de Gestión de Inventarios',
  subtitulo = 'Control y trazabilidad de activos',
  onAbrirMenu,
}) {
  return (
    <header className="encabezado">
      <button
        type="button"
        className="encabezado__menu"
        onClick={onAbrirMenu}
        aria-label="Abrir menú de navegación"
        aria-controls="menu-lateral"
      >
        <span aria-hidden="true">☰</span>
      </button>

      <div className="encabezado__contenido">
        <p className="encabezado__subtitulo">
          {subtitulo}
        </p>

        <h1 className="encabezado__titulo">
          {titulo}
        </h1>
      </div>

      <div
        className="encabezado__estado"
        aria-label="Estado de conexión del sistema"
      >
        <span
          className="encabezado__estado-indicador"
          aria-hidden="true"
        />

        <span>API RFID</span>
      </div>
    </header>
  )
}

export default Encabezado