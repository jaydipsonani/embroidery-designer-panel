import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/modules/Input';
import Button from '../../../components/modules/Button';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Login.module.scss';
import { toastError, toastSuccess } from '@/lib';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const { setUser } = useAuth();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get registered users from local storage
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const foundUser = registeredUsers.find((u: any) => u.email === email);

        if (foundUser) {
            if (foundUser.password && foundUser.password !== password) {
                toastError('Incorrect password.');
                setIsLoading(false);
                return;
            }
            setUser(foundUser);
            localStorage.setItem('designer_user', JSON.stringify(foundUser));
            toastSuccess('Logged in successfully!');
            router.push('/');
        } else {
            toastError('User not found. Please register first.');
        }
        setIsLoading(false);
    };

    // const handleLoginSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const response = await getRouteApi({
    //             method: 'POST',
    //             endPoint: 'distributor/authentication/login',
    //             body: {
    //                 email: inputValue.email,
    //                 password: inputValue.password,
    //             },
    //         });
    //         if (response?.success) {
    //             const userCurrency = response?.data?.currency;
    //             updateCurrencyFromLogin(userCurrency);

    //             if (response?.data?.is_email_verified == 0) {
    //                 await handleResendCode();
    //                 router.push(`/auth/otp-verify?email=${inputValue.email}`);
    //             } else {
    //                 await setUserDetails(response?.data);
    //                 nookies.set(null, 'distributOlyToken', response?.data?.auth_token, {
    //                     path: '/',
    //                     maxAge: 7 * 24 * 60 * 60,
    //                 });
    //                 nookies.set(null, 'is_Olysim_profile', 'true', {
    //                     path: '/',
    //                     maxAge: 60 * 60 * 24 * 365 * 10,
    //                 });
    //                 nookies.set(null, 'active_status', response?.data?.active_status, {
    //                     path: '/',
    //                 });
    //                 nookies.set(
    //                     null,
    //                     'user_data',
    //                     JSON.stringify({
    //                         dist_account_type: response?.data?.dist_account_type,
    //                         balance: response?.data?.balance,
    //                         company_address: response?.data?.company_address,
    //                         company_name: response?.data?.company_name,
    //                         email: response?.data?.email,
    //                         name: response?.data?.name,
    //                         phone_number: response?.data?.phone_number,
    //                         is_price_pdf_invoice: response?.data?.is_price_pdf_invoice,
    //                         // currency: userCurrency,
    //                     }),
    //                     {
    //                         path: '/',
    //                         maxAge: 7 * 24 * 60 * 60,
    //                     }
    //                 );
    //                 if (response?.data?.active_status === 1) {
    //                     if (response?.data?.dist_account_type === 1) {
    //                         router.push('/myWallet');
    //                     } else {
    //                         router.push('/');
    //                     }
    //                 } else if (
    //                     response?.data?.active_status === 2 ||
    //                     response?.data?.active_status === 0
    //                 ) {
    //                     router.push('/verification');
    //                 }
    //             }
    //         } else {
    //             toastError(response?.message || 'Login failed. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to manage your embroidery designs"
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
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<FiLock />}
                    rightIcon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                    required
                />
                <div className={styles.forgotPassword}>
                    <Link href="/auth/forgot-password">Forgot password?</Link>
                </div>

                <Button type="submit" fullWidth isLoading={isLoading}>
                    Sign In
                </Button>

                <div className={styles.loginCardFooter}>
                    Don't have an account? <Link href="/auth/register" className={styles.signupLink}>Sign up</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
