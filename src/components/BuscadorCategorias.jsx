function BuscadorCategorias({
  valor,
  onChange,
  disabled = false,
}) {
  return (
    <div className="buscador-categorias">
      <label
        className="buscador-categorias__etiqueta"
        htmlFor="buscador-categorias"
      >
        Buscar categorías
      </label>

      <div className="buscador-categorias__contenedor">
        <span
          className="buscador-categorias__icono"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          id="buscador-categorias"
          className="buscador-categorias__control"
          type="search"
          value={valor}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por nombre o descripción"
          autoComplete="off"
          disabled={disabled}
        />

        {valor && (
          <button
            type="button"
            className="buscador-categorias__limpiar"
            onClick={() => onChange('')}
            aria-label="Limpiar búsqueda"
            disabled={disabled}
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default BuscadorCategorias