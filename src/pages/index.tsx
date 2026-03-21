import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import HomePage from '@/components/HomePage';

const DashboardHome: React.FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      <HomePage />
    </DashboardLayout>
  );
};

export default DashboardHome;
