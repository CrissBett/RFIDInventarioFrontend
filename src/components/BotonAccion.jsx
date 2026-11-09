function BotonAccion({
  children,
  type = 'button',
  variante = 'primario',
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
}) {
  const clases = [
    'boton-accion',
    `boton-accion--${variante}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={clases}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default BotonAccion