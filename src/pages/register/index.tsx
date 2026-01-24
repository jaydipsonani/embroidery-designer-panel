import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from 'next/link';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import styles from '../login/Login.module.scss'; // Reuse styles for links

const Register: React.FC = () => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await register(name, email);
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
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<FiLock />}
                    required
                />

                <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '1rem' }}>
                    Create Account
                </Button>

                <div className={styles.registerLink}>
                    Already have an account? <Link href="/login">Sign in</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
