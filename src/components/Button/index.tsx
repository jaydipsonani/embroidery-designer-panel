import React from 'react';
import styles from './Button.module.scss';
import { CgSpinner } from 'react-icons/cg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const buttonClass = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ''}
    ${isLoading ? styles.loading : ''}
    ${className}
  `;

    return (
        <button className={buttonClass} disabled={disabled || isLoading} {...props}>
            {isLoading && <CgSpinner className={styles.spinner} />}
            <span className={styles.content}>{children}</span>
        </button>
    );
};

export default Button;
