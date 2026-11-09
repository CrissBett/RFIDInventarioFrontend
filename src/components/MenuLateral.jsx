const MODULOS = [
  {
    id: 'dashboard',
    nombre: 'Dashboard',
    icono: '⌂',
    disponible: false,
  },
  {
    id: 'categorias',
    nombre: 'Categorías',
    icono: '▦',
    disponible: true,
  },
  {
    id: 'activos',
    nombre: 'Activos',
    icono: '▣',
    disponible: false,
  },
  {
    id: 'ubicaciones',
    nombre: 'Ubicaciones y zonas',
    icono: '⌖',
    disponible: false,
  },
  {
    id: 'rfid',
    nombre: 'Etiquetas y lecturas RFID',
    icono: '⌁',
    disponible: false,
  },
  {
    id: 'inventarios',
    nombre: 'Inventarios en campo',
    icono: '✓',
    disponible: false,
  },
  {
    id: 'control',
    nombre: 'Conciliación y alertas',
    icono: '!',
    disponible: false,
  },
  {
    id: 'configuracion',
    nombre: 'Operación y configuración',
    icono: '⚙',
    disponible: false,
  },
]

function MenuLateral({
  moduloActivo,
  abierto = false,
  onSeleccionar,
  onCerrar,
}) {
  function handleSeleccion(modulo) {
    onSeleccionar(modulo)
    onCerrar()
  }

  return (
    <>
      <button
        type="button"
        className={`menu-lateral__fondo ${
          abierto ? 'menu-lateral__fondo--visible' : ''
        }`}
        onClick={onCerrar}
        aria-label="Cerrar menú de navegación"
        tabIndex={abierto ? 0 : -1}
      />

      <aside
        id="menu-lateral"
        className={`menu-lateral ${
          abierto ? 'menu-lateral--abierto' : ''
        }`}
        aria-label="Navegación principal"
      >
        <div className="menu-lateral__marca">
          <div
            className="menu-lateral__logo"
            aria-hidden="true"
          >
            RFID
          </div>

          <div>
            <p className="menu-lateral__nombre">
              Sistema RFID
            </p>

            <span className="menu-lateral__descripcion">
              Gestión de inventarios
            </span>
          </div>
        </div>

        <nav className="menu-lateral__navegacion">
          <p className="menu-lateral__seccion">
            Módulos
          </p>

          <ul className="menu-lateral__lista">
            {MODULOS.map((modulo) => {
              const seleccionado =
                moduloActivo === modulo.id

              return (
                <li key={modulo.id}>
                  <button
                    type="button"
                    className={`menu-lateral__opcion ${
                      seleccionado
                        ? 'menu-lateral__opcion--activa'
                        : ''
                    }`}
                    onClick={() => handleSeleccion(modulo)}
                    aria-current={
                      seleccionado ? 'page' : undefined
                    }
                  >
                    <span
                      className="menu-lateral__icono"
                      aria-hidden="true"
                    >
                      {modulo.icono}
                    </span>

                    <span className="menu-lateral__texto">
                      {modulo.nombre}
                    </span>

                    {!modulo.disponible && (
                      <span className="menu-lateral__pendiente">
                        Próximo
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="menu-lateral__pie">
          <span>ADSO SENA</span>
          <span>Versión 1.0</span>
        </div>
      </aside>
    </>
  )
}

export default MenuLateral