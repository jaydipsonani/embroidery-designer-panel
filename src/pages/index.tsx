import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/modules/Button';
import { useAuth } from '../context/AuthContext';
import { FiUploadCloud, FiGrid } from 'react-icons/fi';
import styles from '../styles/DashboardHome.module.scss';
import { useRouter } from 'next/router';
import HomePage from '@/components/HomePage';

const DashboardHome: React.FC = () => {
  return (
    <DashboardLayout title="Dashboard">
      <HomePage />
    </DashboardLayout>
  );
};

export default DashboardHome;
