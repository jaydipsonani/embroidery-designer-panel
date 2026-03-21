import React, { useState } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/modules/Input';
import Link from 'next/link';
import { FiMail, FiChevronLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './forgotPassword.module.scss';
import { useRouter } from 'next/router';
import { toastSuccess } from '../../../lib';
import { Col, Row } from 'react-bootstrap';
import { toastError } from '@/utils';

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
        if (!email) return toastError('Please enter your email');
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

    // const handleEmailVerify = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     setLoading(true);

    //     try {
    //         const response = await getRouteApi({
    //             method: 'POST',
    //             endPoint: 'distributor/authentication/forgot-password',
    //             body: {
    //                 email: inputValue.email,
    //             },
    //         });

    //         if (response?.success) {
    //             toastSuccess(response.message);
    //             setIsVerified(true);
    //         } else {
    //             setIsClicked(true);
    //             toastError(response?.message);
    //         }
    //     } catch (error) {
    //         console.error('Forgot password error:', error);
    //         toastError('An error occurred. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handlePasswordReset = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!isVerified) {
    //         toastError('Please verify your email before proceeding.');
    //         return;
    //     }
    //     setLoading(true);


    //     if (inputValue.password.length < 8) {
    //         toastError('Password must be at least 8 characters long.');
    //         setLoading(false);
    //         return;
    //     }

    //     // Password must include at least one letter, one number, and one special character
    //     const requirements = [
    //         { regex: /[a-zA-Z]/, message: 'one letter (uppercase or lowercase)' },
    //         { regex: /\d/, message: 'one number' },
    //         { regex: /[@$!%*?&]/, message: 'one special character (@$!%*?&)' },
    //     ];

    //     const missingRequirements = requirements
    //         .filter(req => !req.regex.test(inputValue.password))
    //         .map(req => req.message);

    //     if (missingRequirements.length > 0) {
    //         toastError(`Password must include at least ${missingRequirements.join(', ')}.`);
    //         setLoading(false);
    //         return;
    //     }
    //     if (inputValue.password !== inputValue.confirmPassword) {
    //         toastError('Password and Confirm Password do not match.');
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const response = await getRouteApi({
    //             method: 'POST',
    //             endPoint: 'distributor/authentication/reset-password',
    //             body: {
    //                 email: inputValue.email,
    //                 password: inputValue.password,
    //                 otp: inputValue.otp,
    //             },
    //         });
    //         if (response?.success) {
    //             toastSuccess(response?.message);
    //             router.push('/auth/signin');
    //         } else {
    //             toastError(response?.message || 'Password reset failed.');
    //         }
    //     } catch (error) {
    //         console.error('Reset password error:', error);
    //         toastError('An error occurred. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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
