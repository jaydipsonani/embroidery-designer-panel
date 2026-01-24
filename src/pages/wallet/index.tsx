import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import styles from './Wallet.module.scss';
import { FiDollarSign, FiArrowUpRight, FiArrowDownLeft, FiClock } from 'react-icons/fi';

// Mock Data
const TRANSACTIONS = [
    { id: 1, type: 'CREDIT', description: 'Sale: Vintage Floral', amount: 1200, date: '2025-01-24', status: 'COMPLETED' },
    { id: 2, type: 'CREDIT', description: 'Sale: Lion Mascot', amount: 2500, date: '2025-01-23', status: 'COMPLETED' },
    { id: 3, type: 'DEBIT', description: 'Payout to Bank (**8899)', amount: 3000, date: '2025-01-20', status: 'PROCESSING' },
    { id: 4, type: 'CREDIT', description: 'Sale: Abstract Geometric', amount: 850, date: '2025-01-18', status: 'COMPLETED' },
];

const Wallet: React.FC = () => {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsWithdrawModalOpen(false);
        setWithdrawAmount('');
        alert('Withdrawal request sent successfully!');
    };

    return (
        <DashboardLayout title="My Wallet">
            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><FiDollarSign /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Total Balance</span>
                        <h3 className={styles.statValue}>₹4,550.00</h3>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.green}`}><FiArrowUpRight /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Withdrawable</span>
                        <h3 className={styles.statValue}>₹1,550.00</h3>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.orange}`}><FiClock /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Pending Clearance</span>
                        <h3 className={styles.statValue}>₹3,000.00</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.actions}>
                <Button onClick={() => setIsWithdrawModalOpen(true)}>Request Withdrawal</Button>
            </div>

            {/* Transaction History */}
            <div className={styles.tableCard}>
                <div className={styles.cardHeader}>
                    <h3>Transaction History</h3>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TRANSACTIONS.map((txn) => (
                            <tr key={txn.id}>
                                <td>{txn.date}</td>
                                <td className={styles.descCell}>{txn.description}</td>
                                <td>
                                    <span className={`${styles.type} ${txn.type === 'CREDIT' ? styles.credit : styles.debit}`}>
                                        {txn.type === 'CREDIT' ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                                        {txn.type}
                                    </span>
                                </td>
                                <td className={txn.type === 'CREDIT' ? styles.textGreen : styles.textRed}>
                                    {txn.type === 'CREDIT' ? '+' : '-'} ₹{txn.amount.toFixed(2)}
                                </td>
                                <td>
                                    <Badge variant={txn.status === 'COMPLETED' ? 'success' : 'warning'}>
                                        {txn.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Withdraw Modal */}
            <Modal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                title="Request Payout"
            >
                <form onSubmit={handleWithdraw}>
                    <p className={styles.modalText}>
                        Available for withdrawal: <strong>₹1,550.00</strong>
                    </p>
                    <Input
                        label="Amount to Withdraw (₹)"
                        type="number"
                        placeholder="0.00"
                        max={1550}
                        min={100}
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        required
                    />
                    <div style={{ marginTop: '1rem' }}>
                        <label className={styles.label} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.25rem', display: 'block' }}>Payout Account</label>
                        <div style={{
                            padding: '0.5rem 0.75rem',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '0.375rem',
                            border: '1px solid #e5e7eb',
                            color: '#374151',
                            fontSize: '0.875rem'
                        }}>
                            SBI Account ending in **7890
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            To change this, go to Account Settings.
                        </p>
                    </div>
                    <div className={styles.modalActions}>
                        <Button type="button" variant="secondary" onClick={() => setIsWithdrawModalOpen(false)}>Cancel</Button>
                        <Button type="submit" isLoading={isLoading}>Submit Request</Button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
};

export default Wallet;
