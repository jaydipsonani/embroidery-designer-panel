import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { FiUploadCloud, FiGrid } from 'react-icons/fi';
import styles from '../styles/DashboardHome.module.scss';
import { useRouter } from 'next/router';

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <DashboardLayout title="Dashboard">
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h2>Welcome back, {user?.name}!</h2>
          <p>Here's what's happening with your embroidery designs today.</p>
        </div>
        <div className={styles.actions}>
          <Button variant="primary" onClick={() => router.push('/create')}>
            <FiUploadCloud /> Upload Design
          </Button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Designs</h3>
          <p className={styles.statValue}>12</p>
        </div>
        <div className={styles.statCard}>
          <h3>Published</h3>
          <p className={styles.statValue}>8</p>
          <span className={styles.statLabel}>Active in marketplace</span>
        </div>
        <div className={styles.statCard}>
          <h3>Drafts</h3>
          <p className={styles.statValue}>4</p>
          <span className={styles.statLabel}>Need attention</span>
        </div>
      </div>

      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}><FiGrid /></div>
        <h3>No recent activity</h3>
        <p>Start by uploading your first embroidery design to the marketplace.</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
