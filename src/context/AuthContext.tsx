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
    logout: () => void;
    setUser: any;
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
        <AuthContext.Provider value={{ user, logout, isLoading, setUser }}>
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
