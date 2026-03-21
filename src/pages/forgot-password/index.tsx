import React, { useState } from 'react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from 'next/link';
import { FiMail, FiChevronLeft } from 'react-icons/fi';
import styles from '../login/Login.module.scss';
import { useRouter } from 'next/router';
import { toastSuccess } from '../../lib';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toastSuccess('otp sent to your email!');
    };

    return (
        <AuthLayout
            title="Forgot Password"
            subtitle="Enter your email to receive a OTP"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<FiMail />}
                    required
                />

                <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '1rem' }}>
                    Send OTP
                </Button>

                <div className={styles.registerLink} style={{ marginTop: '2rem', justifyContent: 'center' }}>
                    <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiChevronLeft /> Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
