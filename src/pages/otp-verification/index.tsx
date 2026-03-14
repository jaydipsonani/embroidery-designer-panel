import React, { useState, useRef, useEffect } from 'react';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import styles from '../login/Login.module.scss';
import otpStyles from './OtpVerification.module.scss';
import { useRouter } from 'next/router';
import { toastSuccess } from '../../lib';

const OtpVerification: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 6) return;
        
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toastSuccess('Identity verified successfully!');
        router.push('/');
    };

    const handleResend = () => {
        setTimer(30);
        toastSuccess('New OTP sent to your email.');
    };

    return (
        <AuthLayout
            title="Verify Identity"
            subtitle="We've sent a 6-digit verification code to your email."
        >
            <form onSubmit={handleSubmit}>
                <div className={otpStyles.otpContainer}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            ref={el => { inputRefs.current[index] = el; }}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={otpStyles.otpInput}
                            required
                        />
                    ))}
                </div>

                <div className={otpStyles.resendSection}>
                    {timer > 0 ? (
                        <p>Resend code in <span>0:{timer < 10 ? `0${timer}` : timer}</span></p>
                    ) : (
                        <button type="button" onClick={handleResend} className={otpStyles.resendButton}>
                            Resend Code
                        </button>
                    )}
                </div>

                <Button type="submit" fullWidth isLoading={isLoading} disabled={otp.join('').length < 6}>
                    Verify & Proceed
                </Button>

                <div className={styles.registerLink} style={{ marginTop: '2rem', justifyContent: 'center' }}>
                    <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiChevronLeft /> Use another account
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default OtpVerification;
