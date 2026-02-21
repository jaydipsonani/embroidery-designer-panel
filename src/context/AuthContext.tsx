import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toastSuccess, toastError } from '../lib';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

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
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const userData: User = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || 'User',
                    email: firebaseUser.email || '',
                    role: 'designer'
                };
                setUser(userData);
                localStorage.setItem('designer_user', JSON.stringify(userData));
            } else {
                const storedUser = localStorage.getItem('designer_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
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

    const register = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        // Simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

        // Check if already registered
        if (registeredUsers.some((u: User) => u.email === email)) {
            toastError('Email already registered. Please login.');
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

        toastSuccess('Registration successful! Welcome.');
        router.push('/');
        setIsLoading(false);
    };

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;

            const userData: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                role: 'designer'
            };

            setUser(userData);
            localStorage.setItem('designer_user', JSON.stringify(userData));
            toastSuccess('Logged in with Google successfully!');
            router.push('/');
        } catch (error: any) {
            console.error(error);
            toastError(error.message || 'Google Login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            localStorage.removeItem('designer_user');
            toastSuccess('Logged out successfully.');
            router.push('/login');
        } catch (error: any) {
            toastError('Error during logout.');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, isLoading }}>
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
