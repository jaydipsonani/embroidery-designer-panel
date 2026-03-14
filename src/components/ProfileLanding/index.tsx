import React from 'react';
import { useRouter } from 'next/router';
import styles from './ProfileLanding.module.scss';
import { FiCheckCircle, FiUploadCloud, FiTrendingUp, FiGlobe, FiShield, FiHeart } from 'react-icons/fi';

const ProfileLanding: React.FC = () => {
  const router = useRouter();

  const handleJoinUs = () => {
    router.push('/login');
  };

  const features = [
    {
      icon: <FiGlobe className={styles.featureIcon} />,
      title: 'Global Reach',
      description: 'Showcase and sell your beautiful embroidery designs to buyers across the world.',
    },
    {
      icon: <FiTrendingUp className={styles.featureIcon} />,
      title: 'Track Earnings',
      description: 'Get detailed analytics and regular payouts directly to your wallet.',
    },
    {
      icon: <FiShield className={styles.featureIcon} />,
      title: 'Secure Platform',
      description: 'Your design files are protected and securely delivered only upon purchase.',
    },
    {
      icon: <FiHeart className={styles.featureIcon} />,
      title: 'Community Driven',
      description: 'Join a thriving community of premium digitizers and creators.',
    },
  ];

  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>For Embroidery Designers</div>
          <h1 className={styles.title}>
            Turn Your <span>Embroidery Designs</span> Into a Global Business
          </h1>
          <p className={styles.subtitle}>
            Join the premium digital marketplace for embroidery and digitizing professionals. Seamlessly upload, manage, and monetize your creative work.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.joinButton} onClick={handleJoinUs}>
              Join Us Now
            </button>
            <button className={styles.exploreButton} onClick={() => router.push('/designs')}>
              Explore Marketplace
            </button>
          </div>
          <div className={styles.trustIndicators}>
            <span><FiCheckCircle /> Free to join</span>
            <span><FiCheckCircle /> Instant approvals</span>
            <span><FiCheckCircle /> Secure payments</span>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.imagePlaceholder}>
            <FiUploadCloud className={styles.visualIcon} />
            <div className={styles.visualText}>
              <p className={styles.visualTitle}>Upload your first design</p>
              <p className={styles.visualSub}>Get started in minutes</p>
            </div>
          </div>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeDots}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2>Why digitizers love our platform</h2>
          <p>Everything you need to manage your embroidery design business in one place.</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to start selling?</h2>
          <p>Set up your designer profile today and start reaching thousands of global buyers.</p>
          <button className={styles.ctaButton} onClick={handleJoinUs}>
            Create Your Profile
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileLanding;
