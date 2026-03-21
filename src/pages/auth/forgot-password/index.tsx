import React, { useState } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/modules/Input';
import Button from '../../../components/modules/Button';
import Link from 'next/link';
import { FiMail, FiChevronLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './forgotPassword.module.scss';
import { useRouter } from 'next/router';
import { toastSuccess } from '../../../lib';
import { Col, Row } from 'react-bootstrap';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isOtpLoading, setIsOtpLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleGetOtp = async () => {
        if (!email) return toastSuccess('Please enter your email');
        setIsOtpLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsOtpLoading(false);
        toastSuccess('Verification code sent to your email!');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate password reset
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        toastSuccess('Password reset successfully!');
        router.push('/auth/login');
    };

    return (
        <AuthLayout
            title="Forgot Password"
            subtitle=""
        >
            <form onSubmit={handleSubmit} className={styles.formGrid}>
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<FiMail />}
                    className={styles.inputField}
                    required
                />

                <Row className="mb-0">
                    <Col xs={6}>
                        <button
                            type="button"
                            className={styles.getOtpBtn}
                            onClick={handleGetOtp}
                        >
                            {isOtpLoading ? 'Sending...' : 'Get Verification Code'}
                        </button>
                    </Col>
                    <Col xs={6}>
                        <Input
                            type="text"
                            placeholder="Verification Code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </Col>
                </Row>

                <Row className="mb-0">
                    <Col xs={6}>
                        <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            icon={<FiLock />}
                            rightIcon={showNewPassword ? <FiEyeOff /> : <FiEye />}
                            onRightIconClick={() => setShowNewPassword(!showNewPassword)}
                            className={styles.inputField}
                            required
                        />
                    </Col>
                    <Col xs={6}>
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            icon={<FiLock />}
                            rightIcon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={styles.inputField}
                            required
                        />
                    </Col>
                </Row>

                <button
                    type="submit"
                    className={styles.submitBtn}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                <div className={styles.backToLogin}>
                    <Link href="/auth/login">
                        <FiChevronLeft /> Back to Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
