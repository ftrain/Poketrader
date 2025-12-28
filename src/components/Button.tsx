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
  primary: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  success: 'linear-gradient(135deg, #22c55e, #16a34a)',
  secondary: 'linear-gradient(135deg, #475569, #334155)',
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
