import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Settings.module.scss';
import FileUpload from '../../components/FileUpload';
import { toastSuccess } from '../../lib';
import { FiSave, FiCreditCard, FiUser } from 'react-icons/fi';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'public' | 'payment'>('public');
    const [isLoading, setIsLoading] = useState(false);

    // Profile Details
    const [storeName, setStoreName] = useState('Jaydip Designs');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState<File[]>([]);
    const [instagram, setInstagram] = useState('');
    const [website, setWebsite] = useState('');

    // Bank Details
    const [accountHolder, setAccountHolder] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [upi, setUpi] = useState('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toastSuccess(`${activeTab === 'public' ? 'Profile' : 'Payment'} settings saved successfully!`);
    };

    return (
        <DashboardLayout title="Account Settings">
            <div className={styles.container}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'public' ? styles.active : ''}`}
                        onClick={() => setActiveTab('public')}
                    >
                        Public Profile
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'payment' ? styles.active : ''}`}
                        onClick={() => setActiveTab('payment')}
                    >
                        Payment Details
                    </button>
                </div>

                <form onSubmit={handleSave} className={styles.formCard}>
                    {activeTab === 'public' ? (
                        <>
                            <div className={styles.sectionTitle}>
                                <FiUser />
                                <h2>Public Profile</h2>
                            </div>
                            <p className={styles.sectionDesc}>
                                Manage how you appear to customers on the marketplace.
                            </p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#4b5563' }}>Profile Picture / Logo</label>
                                <FileUpload
                                    files={avatar}
                                    onDrop={setAvatar}
                                    onRemove={() => setAvatar([])}
                                    maxFiles={1}
                                    accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
                                    preview
                                />
                            </div>

                            <div className={styles.grid}>
                                <Input
                                    label="Store Name"
                                    value={storeName}
                                    onChange={(e) => setStoreName(e.target.value)}
                                    placeholder="e.g. Creative Stitches"
                                    fullWidth
                                />
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: '#4b5563' }}>Bio / Description</label>
                                    <textarea
                                        className={styles.textarea} // Assuming global textarea style or reuse Input logic if adapted
                                        rows={4}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
                                    />
                                </div>
                                <Input
                                    label="Instagram Link (Optional)"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    placeholder="https://instagram.com/..."
                                    fullWidth
                                />
                                <Input
                                    label="Website (Optional)"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="https://..."
                                    fullWidth
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.sectionTitle}>
                                <FiCreditCard />
                                <h2>Payment Details</h2>
                            </div>
                            <p className={styles.sectionDesc}>
                                Update your bank details or UPI ID to receive payouts.
                            </p>
                            <div className={styles.grid}>
                                <Input
                                    label="Account Holder Name"
                                    value={accountHolder}
                                    onChange={(e) => setAccountHolder(e.target.value)}
                                    placeholder='Account Holder Name'
                                    fullWidth
                                />
                                <Input
                                    label="Bank Account Number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder='Bank Account Number'
                                    fullWidth
                                />
                                <Input
                                    label="IFSC Code"
                                    value={ifsc}
                                    onChange={(e) => setIfsc(e.target.value)}
                                    placeholder='IFSC Code'
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
                        </>
                    )}

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
