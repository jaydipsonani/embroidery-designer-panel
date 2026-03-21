import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import AuthLayout from '../../../components/AuthLayout';
import Input from '../../../components/modules/Input';
import Button from '../../../components/modules/Button';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './register.module.scss'; // Reuse styles for links
import { useRouter } from 'next/router';
import { toastError, toastSuccess } from '@/lib';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth();
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

        // Check if already registered
        if (registeredUsers.some((u: any) => u.email === email)) {
            toastError('Email already registered. Please login.');
            setIsLoading(false);
            return;
        }

        const newUser: any = {
            id: Date.now().toString(),
            name,
            email,
            role: 'designer',
            password
        };

        // Save new user
        localStorage.setItem('registered_users', JSON.stringify([...registeredUsers, newUser]));

        // Auto login
        setUser(newUser);
        localStorage.setItem('designer_user', JSON.stringify(newUser));

        toastSuccess('Registration successful! Welcome.');
        router.push('/');
        setIsLoading(false);
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join as a designer to start selling your work"
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<FiUser />}
                    required
                />
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
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<FiLock />}
                    rightIcon={showPassword ? <FiEyeOff /> : <FiEye />}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                    required
                />

                <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '1rem' }}>
                    Create Account
                </Button>

                <div className={styles.loginCardFooter}>
                    Already have an account? <Link href="/auth/login" className={styles.signupLink}>Sign in</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
