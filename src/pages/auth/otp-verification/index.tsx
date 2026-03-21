import React from 'react';
import AuthLayout from '../../../components/AuthLayout';
import OtpVerification from '@/components/otpVerification';

const OtpVerificationPage: React.FC = () => {
    return (
        <AuthLayout
            title="Verify OTP"
            subtitle="We've sent a 6-digit verification code to your email."
        >
            <OtpVerification />
        </AuthLayout>
    );
};

export default OtpVerificationPage;
