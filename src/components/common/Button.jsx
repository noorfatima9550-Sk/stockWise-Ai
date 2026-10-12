function Button({
  children,
  type = 'button',
  variant = 'primary',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  disabled = false,
  className = '',
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-lg transition-all duration-200 py-3 px-5 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
    secondary:
      'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
    outline:
      'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </button>
  );
}

export default Button;