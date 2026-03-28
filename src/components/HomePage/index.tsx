import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import styles from './homePage.module.scss';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Button } from 'react-bootstrap';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
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
          <span className={styles.statLabel}>Across all statuses</span>
        </div>
        <div className={styles.statCard}>
          <h3>Published</h3>
          <p className={styles.statValue}>8</p>
          <span className={styles.statLabel}>Active in marketplace</span>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Approval</h3>
          <p className={`${styles.statValue} ${styles.infoText}`}>3</p>
          <span className={styles.statLabel}>Review in progress</span>
        </div>
        <div className={styles.statCard}>
          <h3>Total Sales</h3>
          <p className={styles.statValue}>₹12,450</p>
          <span className={styles.statLabel}>Earned this month</span>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h3>Recent Uploads</h3>
        <Button variant="secondary" onClick={() => router.push('/designs')}>View All</Button>
      </div>

      <div className={styles.recentActivity}>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <strong>Vintage Floral Pattern</strong>
              <span>Submitted for review • 2 hours ago</span>
            </div>
            <span className={styles.statusBadge}>PENDING</span>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <strong>Lion Mascot Logo</strong>
              <span>Published to marketplace • 1 day ago</span>
            </div>
            <span className={styles.statusBadge}>PUBLISHED</span>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityInfo}>
              <strong>Abstract Geometric</strong>
              <span>Saved as draft • 3 days ago</span>
            </div>
            <span className={styles.statusBadge}>DRAFT</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
