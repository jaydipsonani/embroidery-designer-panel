import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Sidebar from '../Sidebar';
import styles from './DashboardLayout.module.scss';
import { CgSpinner } from 'react-icons/cg';
import { FiMenu } from 'react-icons/fi';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [isLoading, user, router]);

    if (isLoading) {
        return (
            <div className={styles.loadingScreen}>
                <CgSpinner className={styles.spinner} />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className={styles.main}>
                <header className={styles.header}>
                    <button
                        className={styles.menuButton}
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <FiMenu />
                    </button>
                    {title && <h1 className={styles.pageTitle}>{title}</h1>}
                </header>

                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
