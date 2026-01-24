import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { useRouter } from 'next/router';
import { FiEdit2, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';
import styles from './Designs.module.scss';
import Link from 'next/link';

// Mock Data
const MOCK_DESIGNS = [
    { id: 1, name: 'Vintage Floral', price: 1200, status: 'PUBLISHED', date: '2025-01-20', sales: 12, category: 'Floral', imageUrl: 'https://placehold.co/100x100/4f46e5/ffffff?text=Floral' },
    { id: 2, name: 'Lion Mascot', price: 2500, status: 'DRAFT', date: '2025-01-22', sales: 0, category: 'Animals', imageUrl: 'https://placehold.co/100x100/10b981/ffffff?text=Lion' },
    { id: 3, name: 'Abstract Geometric', price: 850, status: 'PUBLISHED', date: '2025-01-18', sales: 5, category: 'Abstract', imageUrl: 'https://placehold.co/100x100/f59e0b/ffffff?text=Geo' },
];

const Designs: React.FC = () => {
    const router = useRouter();
    const [designs, setDesigns] = useState(MOCK_DESIGNS);

    // Modal State
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState<typeof MOCK_DESIGNS[0] | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this design?')) {
            setDesigns(prev => prev.filter(d => d.id !== id));
        }
    };

    const handleView = (design: typeof MOCK_DESIGNS[0]) => {
        setSelectedDesign(design);
        setViewModalOpen(true);
    };

    const handleEdit = (id: number) => {
        router.push(`/designs/edit/${id}`);
    };

    return (
        <DashboardLayout title="My Designs">
            <div className={styles.toolbar}>
                <div className={styles.search}>
                    {/* Search Input Placeholer */}
                </div>
                <Button onClick={() => router.push('/designs/create')}>
                    <FiPlus /> New Design
                </Button>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Design Name</th>
                            <th>Status</th>
                            <th>Price (₹)</th>
                            <th>Date Added</th>
                            <th>Sales</th>
                            <th align="right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designs.map((design) => (
                            <tr key={design.id}>
                                <td className={styles.nameCell}>
                                    <img
                                        src={design.imageUrl}
                                        alt={design.name}
                                        className={styles.thumbnail}
                                    />
                                    <div className={styles.nameContainer}>
                                        <span className={styles.designName}>{design.name}</span>
                                        <span className={styles.designCategory}>{design.category}</span>
                                    </div>
                                </td>
                                <td>
                                    <Badge variant={design.status === 'PUBLISHED' ? 'success' : 'neutral'}>
                                        {design.status}
                                    </Badge>
                                </td>
                                <td>₹{design.price.toFixed(2)}</td>
                                <td>{design.date}</td>
                                <td>{design.sales}</td>
                                <td className={styles.actionsCell}>
                                    <button
                                        className={styles.actionBtn}
                                        title="View"
                                        onClick={() => handleView(design)}
                                    >
                                        <FiEye />
                                    </button>
                                    <button
                                        className={styles.actionBtn}
                                        title="Edit"
                                        onClick={() => handleEdit(design.id)}
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.delete}`}
                                        onClick={() => handleDelete(design.id)}
                                        title="Delete"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {designs.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                                    No designs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <Modal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="Design Details"
                footer={<Button onClick={() => setViewModalOpen(false)} variant="secondary">Close</Button>}
            >
                {selectedDesign && (
                    <div className={styles.viewContent}>
                        <img
                            src={selectedDesign.imageUrl}
                            alt={selectedDesign.name}
                            className={styles.previewLarge}
                        />
                        <div className={styles.viewDetails}>
                            <h4>{selectedDesign.name}</h4>
                            <p className={styles.metaRow}>
                                <Badge variant={selectedDesign.status === 'PUBLISHED' ? 'success' : 'neutral'}>
                                    {selectedDesign.status}
                                </Badge>
                                <span>{selectedDesign.category}</span>
                            </p>
                            <p className={styles.priceTag}>Price: ₹{selectedDesign.price.toFixed(2)}</p>
                            <div className={styles.statBox}>
                                <span>Total Sales</span>
                                <strong>{selectedDesign.sales} units</strong>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </DashboardLayout>
    );
};

export default Designs;
