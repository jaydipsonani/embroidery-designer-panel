import React from 'react';
import styles from './AuthLayout.module.scss';
import Image from 'next/image';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className={styles.container}>
            {/* Left Side: Image Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.imageWrapper}>
                    <Image 
                        src="/images/auth-sidebar.png" 
                        alt="Embroidery Design" 
                        fill 
                        priority 
                        className={styles.sidebarImage}
                    />
                    <div className={styles.imageOverlay} />
                </div>
                <div className={styles.sidebarContent}>
                    <div className={styles.logoBadge}>E</div>
                    <h2 className={styles.sidebarTitle}>Embroidery Designer Panel</h2>
                    <p className={styles.sidebarText}>
                        Elevate your digitizing craft. Join the world's most premium marketplace for embroidery professionals.
                    </p>
                </div>
            </div>

            {/* Right Side: Auth Forms */}
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.subtitle}>{subtitle}</p>
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                    <div className={styles.footer}>
                        <p className={styles.copyright}>© {new Date().getFullYear()} Embroidery Designer Panel. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
