import BotonAccion from './BotonAccion'

function FilaCategoria({
  categoria,
  onEditar,
  onEliminar,
  disabled = false,
}) {
  const estadoTexto = categoria.activo
    ? 'Activa'
    : 'Inactiva'

  const estadoClase = categoria.activo
    ? 'estado-categoria--activa'
    : 'estado-categoria--inactiva'

  return (
    <tr className="fila-categoria">
      <td data-label="ID">
        {categoria.idCategoria}
      </td>

      <td data-label="Nombre">
        <strong>{categoria.nombre}</strong>
      </td>

      <td data-label="Descripción">
        {categoria.descripcion}
      </td>

      <td data-label="Estado">
        <span
          className={`estado-categoria ${estadoClase}`}
        >
          {estadoTexto}
        </span>
      </td>

      <td
        className="fila-categoria__acciones"
        data-label="Acciones"
      >
        <BotonAccion
          variante="secundario"
          onClick={() => onEditar(categoria)}
          disabled={disabled}
          ariaLabel={`Editar categoría ${categoria.nombre}`}
        >
          Editar
        </BotonAccion>

        <BotonAccion
          variante="peligro"
          onClick={() => onEliminar(categoria)}
          disabled={disabled}
          ariaLabel={`Eliminar categoría ${categoria.nombre}`}
        >
          Eliminar
        </BotonAccion>
      </td>
    </tr>
  )
}

export default FilaCategoria