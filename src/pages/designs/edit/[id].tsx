import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import Button from '../../../components/Button';
import DesignForm from '../../../components/DesignForm';
import { useRouter } from 'next/router';
import { toastSuccess, toastError } from '../../../lib';

// Mock Data (Duplicated for now, ideally in a separate mock file or context)
const MOCK_DESIGNS = [
    {
        id: 1,
        name: 'Vintage Floral',
        price: 1200,
        category: 'Floral',
        description: 'A beautiful vintage floral pattern suitable for all seasons.',
        stitchingCount: 15000,
        hoopSize: '5x7',
        formats: ['DST', 'PES'],
        status: 'PUBLISHED'
    },
    {
        id: 2,
        name: 'Lion Mascot',
        price: 2500,
        category: 'Animals',
        description: 'Fierce lion mascot for sports teams.',
        stitchingCount: 22000,
        hoopSize: '6x10',
        formats: ['EMB'],
        status: 'DRAFT'
    },
];

const EditDesign: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [design, setDesign] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            // Simulate Fetch
            const foundDesign = MOCK_DESIGNS?.find(d => d.id === Number(id));
            if (foundDesign) {
                // Map to form values
                setDesign({
                    title: foundDesign.name,
                    price: foundDesign.price,
                    category: foundDesign.category,
                    description: foundDesign.description,
                    stitchingCount: foundDesign.stitchingCount,
                    hoopSize: foundDesign.hoopSize,
                    selectedFormats: foundDesign.formats
                });
            } else {
                toastError("Design not found");
                router.push('/designs');
            }
        }
    }, [id, router]);

    const handleSubmit = async (data: any) => {
        console.log("Updating Design Data:", data);
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        toastSuccess("Design updated successfully!");
        router.push('/designs');
    };

    if (!design) {
        return (
            <DashboardLayout title="Edit Design">
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title={`Edit Design #${id} `}>
            <DesignForm
                mode="edit"
                initialValues={design}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </DashboardLayout>
    );
};

export default EditDesign;
