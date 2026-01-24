import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './Login.module.scss'; // We'll create a small local style for page specific links

const Login: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await login(email, password);
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
                    <Link href="/forgot-password">Forgot password?</Link>
                </div>

                <Button type="submit" fullWidth isLoading={isLoading}>
                    Sign In
                </Button>

                <div className={styles.registerLink}>
                    Don't have an account? <Link href="/register">Sign up</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Login;
