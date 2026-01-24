import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Mock User Type
interface User {
    id: string;
    name: string;
    email: string;
    role: 'designer';
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
    register: (name: string, email: string) => Promise<void>;
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

    const login = async (email: string) => {
        // Mock Login
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API
        const mockUser: User = {
            id: '1',
            name: 'Test Designer',
            email,
            role: 'designer',
        };
        setUser(mockUser);
        localStorage.setItem('designer_user', JSON.stringify(mockUser));
        setIsLoading(false);
        router.push('/');
    };

    const register = async (name: string, email: string) => {
        // Mock Register
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockUser: User = { id: '1', name, email, role: 'designer' };
        setUser(mockUser);
        localStorage.setItem('designer_user', JSON.stringify(mockUser));
        setIsLoading(false);
        router.push('/');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('designer_user');
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
