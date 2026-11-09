function PiePagina() {
  const anioActual = new Date().getFullYear()

  return (
    <footer className="pie-pagina">
      <p className="pie-pagina__proyecto">
        Sistema RFID de Gestión de Inventarios
      </p>

      <p className="pie-pagina__informacion">
        Proyecto formativo ADSO · SENA · {anioActual}
      </p>

      <span className="pie-pagina__version">
        Versión 1.0
      </span>
    </footer>
  )
}

export default PiePagina