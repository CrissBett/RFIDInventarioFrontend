import FilaCategoria from './FilaCategoria'

function TablaCategorias({
  categorias = [],
  onEditar,
  onEliminar,
  disabled = false,
}) {
  if (categorias.length === 0) {
    return (
      <div
        className="tabla-categorias__vacio"
        role="status"
      >
        <h3>No se encontraron categorías</h3>

        <p>
          Registra una categoría o modifica el criterio de
          búsqueda para consultar otros resultados.
        </p>
      </div>
    )
  }

  return (
    <div className="tabla-categorias__contenedor">
      <table className="tabla-categorias">
        <caption className="sr-only">
          Listado de categorías de activos registradas
        </caption>

        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <FilaCategoria
              key={categoria.idCategoria}
              categoria={categoria}
              onEditar={onEditar}
              onEliminar={onEliminar}
              disabled={disabled}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaCategorias