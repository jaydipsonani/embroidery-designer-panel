import React, { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import DesignForm from '../../../components/DesignForm';
import { useRouter } from 'next/router';

const CreateDesign: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        console.log("Submitting Design Data:", data);
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push('/designs');
    };

    return (
        <DashboardLayout title="Upload New Design">
            <DesignForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
        </DashboardLayout>
    );
};

export default CreateDesign;
