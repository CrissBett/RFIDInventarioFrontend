import BuscadorCategorias from './BuscadorCategorias'
import FormularioCategoria from './FormularioCategoria'
import IndicadorCarga from './IndicadorCarga'
import MensajeAlerta from './MensajeAlerta'
import TablaCategorias from './TablaCategorias'

function PanelCategorias({
  categorias,
  criterioBusqueda,
  formulario,
  errores,
  mensaje,
  cargando,
  guardando,
  editando,
  onCambiarBusqueda,
  onCambiarFormulario,
  onGuardar,
  onCancelarEdicion,
  onEditar,
  onEliminar,
  onCerrarMensaje,
}) {
  return (
    <main
      className="panel-categorias"
      id="contenido-principal"
    >
      <section className="panel-categorias__presentacion">
        <div>
          <p className="panel-categorias__etiqueta">
            Catálogos maestros
          </p>

          <h2 className="panel-categorias__titulo">
            Categorías de activos
          </h2>

          <p className="panel-categorias__descripcion">
            Registra y administra las categorías utilizadas
            para clasificar los activos del sistema RFID.
          </p>
        </div>

        <div
          className="panel-categorias__resumen"
          aria-label="Resumen de categorías"
        >
          <span className="panel-categorias__resumen-valor">
            {categorias.length}
          </span>

          <span className="panel-categorias__resumen-texto">
            categorías visibles
          </span>
        </div>
      </section>

      <MensajeAlerta
        tipo={mensaje.tipo}
        mensaje={mensaje.texto}
        onCerrar={onCerrarMensaje}
      />

      <IndicadorCarga
        visible={cargando}
        mensaje="Consultando categorías..."
      />

      <div className="panel-categorias__distribucion">
        <section
          className="panel-categorias__formulario"
          aria-label="Formulario de categoría"
        >
          <FormularioCategoria
            formulario={formulario}
            errores={errores}
            editando={editando}
            guardando={guardando}
            onChange={onCambiarFormulario}
            onGuardar={onGuardar}
            onCancelar={onCancelarEdicion}
          />
        </section>

        <section
          className="panel-categorias__listado"
          aria-labelledby="titulo-listado-categorias"
        >
          <div className="panel-categorias__listado-encabezado">
            <div>
              <p className="panel-categorias__etiqueta">
                Registros
              </p>

              <h2
                id="titulo-listado-categorias"
                className="panel-categorias__listado-titulo"
              >
                Categorías registradas
              </h2>
            </div>

            <span className="panel-categorias__cantidad">
              {categorias.length} resultados
            </span>
          </div>

          <BuscadorCategorias
            valor={criterioBusqueda}
            onChange={onCambiarBusqueda}
            disabled={cargando}
          />

          <TablaCategorias
            categorias={categorias}
            onEditar={onEditar}
            onEliminar={onEliminar}
            disabled={cargando || guardando}
          />
        </section>
      </div>
    </main>
  )
}

export default PanelCategorias