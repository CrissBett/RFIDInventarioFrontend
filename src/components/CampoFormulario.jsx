function CampoFormulario({
  id,
  label,
  name,
  value,
  onChange,
  error = '',
  type = 'text',
  multilinea = false,
  maxLength,
  placeholder = '',
  required = false,
  disabled = false,
}) {
  const errorId = `${id}-error`

  const propiedadesComunes = {
    id,
    name,
    value,
    onChange,
    maxLength,
    placeholder,
    required,
    disabled,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className="campo-formulario">
      <label className="campo-formulario__etiqueta" htmlFor={id}>
        {label}
        {required && (
          <span
            className="campo-formulario__obligatorio"
            aria-hidden="true"
          >
            {' '}*
          </span>
        )}
      </label>

      {multilinea ? (
        <textarea
          {...propiedadesComunes}
          className={`campo-formulario__control ${
            error ? 'campo-formulario__control--error' : ''
          }`}
          rows="4"
        />
      ) : (
        <input
          {...propiedadesComunes}
          type={type}
          className={`campo-formulario__control ${
            error ? 'campo-formulario__control--error' : ''
          }`}
        />
      )}

      {maxLength && (
        <span className="campo-formulario__contador">
          {value.length} de {maxLength} caracteres
        </span>
      )}

      {error && (
        <span
          id={errorId}
          className="campo-formulario__error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default CampoFormulario