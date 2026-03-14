import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import ProfileLanding from '../components/ProfileLanding';
import { CgSpinner } from 'react-icons/cg';

const ProfilePage: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
                <CgSpinner size={40} className="spinner" />
            </div>
        );
    }

    // If no user is logged in, show the Landing Page for the profile gateway
    if (!user) {
        return <ProfileLanding />;
    }

    // Authenticated user profile view
    return (
        <DashboardLayout title="My Profile">
            <div style={{ padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2>Designer Profile</h2>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', color: '#4f46e5', fontWeight: 'bold' }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>{user.name}</h3>
                            <p style={{ margin: 0, color: '#6b7280' }}>{user.email}</p>
                            <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.25rem 0.75rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500, textTransform: 'capitalize' }}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                    
                    <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1rem 0' }} />
                    
                    <div>
                        <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>Account Highlights</h4>
                        <ul style={{ listStyleType: 'none', padding: 0, color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>• Joined: Just now</li>
                            <li>• Account Status: Active</li>
                            <li>• Verification: Pending</li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;
