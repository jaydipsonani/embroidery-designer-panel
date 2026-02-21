import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.scss';
import { FiGrid, FiUploadCloud, FiLayers, FiLogOut, FiSettings, FiDollarSign, FiX, FiBarChart2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal';
import { Button } from 'react-bootstrap';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { logout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const confirmLogout = () => {
        logout();
        closeLogoutModal();
    };

    const isActive = (path: string) => router.pathname === path || router.pathname.startsWith(path + '/');

    const navItems = [
        { label: 'Dashboard', path: '/', icon: <FiGrid /> },
        { label: 'My Designs', path: '/designs', icon: <FiLayers /> },
        { label: 'Upload Design', path: '/create', icon: <FiUploadCloud /> },
        { label: 'Analytics', path: '/analytics', icon: <FiBarChart2 /> },
        { label: 'Wallet', path: '/wallet', icon: <FiDollarSign /> }
    ];

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`}
                onClick={onClose}
            />

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.logo} onClick={() => router.push('/')}>
                    <div className={styles.logoIcon}>E</div>
                    <span className={styles.logoText}>Embroidery</span>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FiX />
                    </button>
                </div>

                <nav className={styles.nav}>
                    <p className={styles.sectionTitle}>MENU</p>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
                                    onClick={onClose} // Close sidebar on nav click (mobile)
                                >
                                    <span className={styles.icon}>{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className={styles.sectionTitle} style={{ marginTop: '2rem' }}>ACCOUNT</p>
                    <ul className={styles.navList}>
                        <li>
                            <Link href="/settings" className={`${styles.navItem} ${isActive('/settings') ? styles.active : ''}`} onClick={onClose}>
                                <span className={styles.icon}><FiSettings /></span>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.footer}>
                    <button onClick={openLogoutModal} className={styles.logoutButton}>
                        <FiLogOut />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={closeLogoutModal}
                title="Confirm Logout"
                footer={
                    <>
                        <Button variant="secondary" onClick={closeLogoutModal} style={{ marginRight: '10px' }}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmLogout}>
                            Logout
                        </Button>
                    </>
                }
            >
                Are you sure you want to log out?
            </Modal>
        </>
    );
};

export default Sidebar;
