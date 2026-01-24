import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

// Mock User Type
interface User {
    id: string;
    name: string;
    email: string;
    role: 'designer';
    password?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage for mock session
        const storedUser = localStorage.getItem('designer_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get registered users from local storage
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const foundUser = registeredUsers.find((u: User) => u.email === email);

        if (foundUser) {
            if (foundUser.password && foundUser.password !== password) {
                toast.error('Incorrect password.');
                setIsLoading(false);
                return;
            }

            setUser(foundUser);
            localStorage.setItem('designer_user', JSON.stringify(foundUser));
            toast.success('Logged in successfully!');
            router.push('/');
        } else {
            toast.error('User not found. Please register first.');
        }
        setIsLoading(false);
    };

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

        // Check if already registered
        if (registeredUsers.some((u: User) => u.email === email)) {
            toast.error('Email already registered. Please login.');
            setIsLoading(false);
            return;
        }

        const newUser: User = {
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

        toast.success('Registration successful! Welcome.');
        router.push('/');
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('designer_user');
        toast.success('Logged out successfully.');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
