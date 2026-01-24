import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Settings.module.scss';
import { toastSuccess } from '../../lib';
import { FiSave, FiCreditCard } from 'react-icons/fi';

const Settings: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Bank Details
    const [accountHolder, setAccountHolder] = useState('Jaydip Test');
    const [accountNumber, setAccountNumber] = useState('1234567890');
    const [ifsc, setIfsc] = useState('SBIN0001234');
    const [upi, setUpi] = useState('jaydip@upi');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toastSuccess('Payment settings saved successfully!');
    };

    return (
        <DashboardLayout title="Account Settings">
            <div className={styles.container}>
                <div className={styles.sectionTitle}>
                    <FiCreditCard />
                    <h2>Payment Details</h2>
                </div>
                <p className={styles.sectionDesc}>
                    Update your bank details or UPI ID to receive payouts.
                </p>

                <form onSubmit={handleSave} className={styles.formCard}>
                    <div className={styles.grid}>
                        <Input
                            label="Account Holder Name"
                            value={accountHolder}
                            onChange={(e) => setAccountHolder(e.target.value)}
                            fullWidth
                        />
                        <Input
                            label="Bank Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            fullWidth
                        />
                        <Input
                            label="IFSC Code"
                            value={ifsc}
                            onChange={(e) => setIfsc(e.target.value)}
                            fullWidth
                        />
                        <Input
                            label="UPI ID (Optional)"
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                            placeholder="username@bank"
                            fullWidth
                        />
                    </div>

                    <div className={styles.actions}>
                        <Button type="submit" isLoading={isLoading}>
                            <FiSave /> Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
