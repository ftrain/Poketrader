import type { CSSProperties } from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'success' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
  style?: CSSProperties;
}

const VARIANTS = {
  primary: 'linear-gradient(135deg, #667eea, #764ba2)',
  success: 'linear-gradient(135deg, #4caf50, #2e7d32)',
  secondary: 'rgba(255,255,255,0.2)',
};

export function Button({
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  children,
  style
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="game-button"
      style={{
        width: fullWidth ? '100%' : undefined,
        background: disabled ? '#555' : VARIANTS[variant],
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
