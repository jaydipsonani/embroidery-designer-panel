import React from 'react';
import styles from './AuthLayout.module.scss';
import Link from 'next/link';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
                <div className={styles.footer}>
                    <p className={styles.copyright}>© 2025 Designer Panel</p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
