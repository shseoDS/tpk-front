import { ButtonHTMLAttributes, ReactNode } from 'react';

type SLButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'text';

interface SLButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SLButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<SLButtonVariant, string> = {
  primary: [
    'bg-[#3592fd] text-white',
    'hover:bg-[#1d7fef]',
    'active:bg-[#0c6ad3]',
    'disabled:bg-[#b8e1fd] disabled:text-white',
  ].join(' '),

  secondary: [
    'bg-[#f2f4f5] text-[#676b6e]',
    'hover:bg-[#eeefef]',
    'active:bg-[#dfe3e6]',
    'disabled:bg-[#f2f4f5] disabled:text-[#dfe3e6]',
  ].join(' '),

  tertiary: [
    'bg-[#f0f9fd] text-[#3592fd]',
    'hover:bg-[#daf0fe]',
    'active:bg-[#b8e1fd]',
    'disabled:bg-[#daf0fe] disabled:text-white',
  ].join(' '),

  outlined: [
    'bg-white border border-[#eeefef] text-[#676b6e]',
    'hover:border-[#dfe3e6]',
    'active:border-[#cfd4d9]',
    'disabled:border-[#f2f4f5] disabled:text-[#dfe3e6]',
  ].join(' '),

  text: [
    'text-[#676b6e]',
    'hover:text-[#606571]',
    'active:text-[#525457]',
    'disabled:text-[#dfe3e6]',
  ].join(' '),
};

export default function SLButton({
  variant = 'primary',
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: SLButtonProps) {
  const isText = variant === 'text';

  return (
    <button
      disabled={disabled}
      className={[
        fullWidth ? 'flex w-full items-center justify-center' : 'inline-flex items-center justify-center',
        'typography-body-2 tracking-[-0.35px]',
        'rounded-[12px] transition-colors',
        'disabled:cursor-not-allowed',
        isText ? 'gap-[2px]' : 'gap-[4px] h-[52px] px-[10px] py-[8px]',
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leftIcon && <span className="shrink-0 size-[16px] flex items-center justify-center">{leftIcon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {rightIcon && <span className="shrink-0 size-[16px] flex items-center justify-center">{rightIcon}</span>}
    </button>
  );
}
