import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    icon,
    fullWidth = true,
    className = '',
    id,
    rightIcon,
    onRightIconClick,
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            <div className={styles.inputContainer}>
                {icon && <span className={styles.icon}>{icon}</span>}
                <input
                    id={inputId}
                    className={`${styles.input} ${error ? styles.hasError : ''} ${icon ? styles.hasIcon : ''} ${rightIcon ? styles.hasRightIcon : ''}`}
                    {...props}
                />
                {rightIcon && (
                    <span
                        className={styles.rightIcon}
                        onClick={onRightIconClick}
                        style={{ cursor: onRightIconClick ? 'pointer' : 'default' }}
                    >
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
