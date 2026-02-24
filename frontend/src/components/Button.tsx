import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  error?: string | null;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  onClick,
  disabled = false,
  loading = false,
  error = null,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  title = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-soft hover:shadow-medium';
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: error 
      ? 'bg-error text-white hover:bg-red-600 disabled:opacity-50'
      : 'bg-primary text-white hover:bg-secondary hover:shadow-green-glow disabled:opacity-50',
    secondary: error
      ? 'bg-error text-white hover:bg-red-600 disabled:opacity-50'
      : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50',
    accent: error
      ? 'bg-error text-white hover:bg-red-600 disabled:opacity-50'
      : 'bg-accent text-dark hover:bg-primary hover:text-white hover:shadow-green-glow disabled:opacity-50',
    ghost: 'text-primary hover:bg-primary/10 hover:text-secondary disabled:opacity-50',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = (disabled || loading) ? 'cursor-not-allowed opacity-60' : 'active:scale-95';

  const handleClick = async () => {
    if (!onClick || disabled || loading) return;
    try {
      const result = onClick();
      if (result instanceof Promise) {
        await result;
      }
    } catch (err) {
      console.error('Button click error:', err);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading || !!error}
      title={error ? `Error: ${error}` : title}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {loading && <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>}
      {error && <span>⚠️</span>}
      {children}
    </button>
  );
}
