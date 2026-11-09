import BotonAccion from './BotonAccion'
import CampoFormulario from './CampoFormulario'

function FormularioCategoria({
  formulario,
  errores,
  editando = false,
  guardando = false,
  onChange,
  onGuardar,
  onCancelar,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    onGuardar()
  }

  return (
    <form
      className="formulario-categoria"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="formulario-categoria__encabezado">
        <div>
          <p className="formulario-categoria__etiqueta">
            Catálogo maestro
          </p>

          <h2 className="formulario-categoria__titulo">
            {editando
              ? 'Editar categoría'
              : 'Registrar categoría'}
          </h2>
        </div>
      </div>

      <CampoFormulario
        id="nombre"
        label="Nombre"
        name="nombre"
        value={formulario.nombre}
        onChange={onChange}
        error={errores.nombre}
        maxLength={100}
        placeholder="Ejemplo: Equipos de cómputo"
        required
        disabled={guardando}
      />

      <CampoFormulario
        id="descripcion"
        label="Descripción"
        name="descripcion"
        value={formulario.descripcion}
        onChange={onChange}
        error={errores.descripcion}
        maxLength={255}
        placeholder="Describe los activos que pertenecen a esta categoría"
        multilinea
        required
        disabled={guardando}
      />

      <div className="formulario-categoria__estado">
        <label
          className="formulario-categoria__estado-control"
          htmlFor="activo"
        >
          <input
            id="activo"
            name="activo"
            type="checkbox"
            checked={formulario.activo}
            onChange={onChange}
            disabled={guardando}
          />

          <span>Categoría activa</span>
        </label>

        <p className="formulario-categoria__estado-ayuda">
          Las categorías activas pueden utilizarse para
          clasificar activos.
        </p>
      </div>

      <div className="formulario-categoria__acciones">
        <BotonAccion
          type="submit"
          variante="primario"
          disabled={guardando}
        >
          {guardando
            ? 'Guardando...'
            : editando
              ? 'Actualizar categoría'
              : 'Guardar categoría'}
        </BotonAccion>

        {editando && (
          <BotonAccion
            variante="secundario"
            onClick={onCancelar}
            disabled={guardando}
          >
            Cancelar edición
          </BotonAccion>
        )}
      </div>
    </form>
  )
}

export default FormularioCategoria