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
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: error 
      ? 'bg-red-600/50 text-white disabled:opacity-50'
      : 'bg-primary text-white hover:bg-secondary disabled:opacity-50',
    secondary: 'bg-white border-2 border-border text-dark hover:border-primary hover:text-primary disabled:opacity-50',
    accent: error
      ? 'bg-red-600/50 text-white disabled:opacity-50'
      : 'bg-secondary text-white hover:bg-primary disabled:opacity-50',
    ghost: 'text-gray-700 hover:text-primary disabled:opacity-50',
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = (disabled || loading) ? 'cursor-not-allowed opacity-60' : 'hover:scale-105 active:scale-95';

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
      onClick={handleClick}
      disabled={disabled || loading || !!error}
      title={error ? `Error: ${error}` : title}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {error && <span>⚠️</span>}
      {children}
    </button>
  );
}
