import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './Analytics.module.scss';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingBag, FiEye } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
    // Mock Data
    const data = [
        { name: 'Mon', sales: 4000, revenue: 2400 },
        { name: 'Tue', sales: 3000, revenue: 1398 },
        { name: 'Wed', sales: 2000, revenue: 9800 },
        { name: 'Thu', sales: 2780, revenue: 3908 },
        { name: 'Fri', sales: 1890, revenue: 4800 },
        { name: 'Sat', sales: 2390, revenue: 3800 },
        { name: 'Sun', sales: 3490, revenue: 4300 },
    ];

    return (
        <DashboardLayout title="Analytics & Reports">
            <div className={styles.container}>
                {/* Key Metrics */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statTitle}>Total Revenue</span>
                        <span className={styles.statValue}>₹45,231</span>
                        <span className={`${styles.statTrend} ${styles.up}`}>
                            <FiTrendingUp /> +12.5% vs last month
                        </span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statTitle}>Total Sales</span>
                        <span className={styles.statValue}>1,205</span>
                        <span className={`${styles.statTrend} ${styles.up}`}>
                            <FiTrendingUp /> +8.2% vs last month
                        </span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statTitle}>Design Views</span>
                        <span className={styles.statValue}>8,942</span>
                        <span className={`${styles.statTrend} ${styles.down}`}>
                            <FiTrendingDown /> -2.1% vs last month
                        </span>
                    </div>
                </div>

                {/* Charts */}
                <div className={styles.chartsSection}>
                    <h3 className={styles.chartTitle}>Revenue Overview</h3>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
