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
