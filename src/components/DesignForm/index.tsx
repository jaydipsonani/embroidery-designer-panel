import React, { useState, useEffect } from 'react';
import Input from '../Input';
import Button from '../Button';
import FileUpload from '../FileUpload';
import styles from './DesignForm.module.scss';
import { useRouter } from 'next/router';
import { toastError } from '../../lib';
import { FileRejection } from 'react-dropzone';

// Constants
const CATEGORIES = ['Floral', 'Abstract', 'Animals', 'Kids', 'Logos', 'Traditional'];
const FORMATS = ['DST', 'PES', 'EMB']; // Only these allowed
const HOOP_SIZES = ['4x4', '5x7', '6x10', '8x8', '8x12', 'Commercial'];

interface DesignFormProps {
    initialValues?: any;
    mode: 'create' | 'edit';
    onSubmit: (data: any) => Promise<void>;
    isLoading?: boolean;
}

const DesignForm: React.FC<DesignFormProps> = ({ initialValues, mode, onSubmit, isLoading = false }) => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Form State
    const [title, setTitle] = useState(initialValues?.title || '');
    const [price, setPrice] = useState(initialValues?.price || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [category, setCategory] = useState(initialValues?.category || '');
    const [stitchingCount, setStitchingCount] = useState(initialValues?.stitchingCount || '');
    const [hoopSize, setHoopSize] = useState(initialValues?.hoopSize || '');
    const [selectedFormats, setSelectedFormats] = useState<string[]>(initialValues?.selectedFormats || []);

    // Files
    const [previewImage, setPreviewImage] = useState<File[]>([]); // Logic for initial files to be added if needed
    const [designFiles, setDesignFiles] = useState<File[]>([]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "Design name is required";
        if (!price || Number(price) <= 0) newErrors.price = "Price must be greater than zero";
        if (!category) newErrors.category = "Please select a category";
        if (!stitchingCount || Number(stitchingCount) <= 0) newErrors.stitchingCount = "Stitching count is required";
        if (!hoopSize) newErrors.hoopSize = "Please select a hoop size";
        if (selectedFormats.length === 0) newErrors.formats = "Select at least one supported format";

        // In edit mode, we might not require re-uploading files if they already exist (logic can be refined)
        // For now enforcing strictly as requested for Create
        if (mode === 'create') {
            if (previewImage.length === 0) newErrors.preview = "Preview image is mandatory";
            if (designFiles.length === 0) newErrors.files = "At least one embroidery file is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (status: 'DRAFT' | 'PUBLISHED') => {
        if (status === 'PUBLISHED' || status === 'DRAFT' && !validate()) {
            if (Object.keys(errors).length > 0) {
                toastError("Please fix the errors before submitting");
            }
            return;
        }

        const data = {
            title,
            price,
            description,
            category,
            stitchingCount,
            hoopSize,
            selectedFormats,
            previewImage,
            designFiles,
            status
        };

        await onSubmit(data);
    };

    const toggleFormat = (format: string) => {
        setSelectedFormats(prev =>
            prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
        );
    };

    const handleEmbroideryDrop = (files: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
            toastError("Invalid file type! Only .dst, .pes, .emb are allowed.");
        }
        setDesignFiles(prev => [...prev, ...files]);
    };

    return (
        <div className={styles.formGrid}>
            <div className={styles.column}>
                <section className={styles.card}>
                    <h3>Basic Information</h3>
                    <Input
                        label="Design Name"
                        placeholder="e.g. Vintage Floral Pattern"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={errors.title}
                    />
                    <div className={styles.row}>
                        <Input
                            label="Price (₹)"
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            error={errors.price}
                        />
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Category</label>
                            <select
                                className={`${styles.select} ${errors.category ? styles.hasError : ''}`}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category...</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.category && <span className={styles.errorMessage}>{errors.category}</span>}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <Input
                            label="Stitching Count"
                            type="number"
                            placeholder="e.g. 15000"
                            value={stitchingCount}
                            onChange={(e) => setStitchingCount(e.target.value)}
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            error={errors.stitchingCount}
                        />
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Hoop Size</label>
                            <select
                                className={`${styles.select} ${errors.hoopSize ? styles.hasError : ''}`}
                                value={hoopSize}
                                onChange={(e) => setHoopSize(e.target.value)}
                            >
                                <option value="">Select Hoop Size...</option>
                                {HOOP_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.hoopSize && <span className={styles.errorMessage}>{errors.hoopSize}</span>}
                        </div>
                    </div>

                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Description (Optional)</label>
                        <textarea
                            className={styles.textarea}
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </section>

                <section className={styles.card}>
                    <h3>Technical Details</h3>
                    <label className={styles.label}>Supported Formats {errors.formats && <span className={styles.errorMessage}>({errors.formats})</span>}</label>
                    <div className={styles.tags}>
                        {FORMATS.map(fmt => (
                            <button
                                type="button"
                                key={fmt}
                                className={`${styles.tag} ${selectedFormats.includes(fmt) ? styles.activeTag : ''}`}
                                onClick={() => toggleFormat(fmt)}
                            >
                                {fmt}
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <div className={styles.column}>
                <section className={styles.card}>
                    <h3>Media & Files</h3>

                    <div className={styles.uploadSection}>
                        <label className={styles.label}>Preview Image (Mandatory)</label>
                        <FileUpload
                            onDrop={setPreviewImage}
                            files={previewImage}
                            onRemove={() => setPreviewImage([])}
                            accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
                            maxFiles={1}
                            preview
                        />
                        {errors.preview && <span className={styles.errorMessage}>{errors.preview}</span>}
                    </div>

                    <div className={styles.uploadSection}>
                        <label className={styles.label}>Embroidery Files</label>
                        {/* Restriction implemented here */}
                        <FileUpload
                            onDrop={handleEmbroideryDrop}
                            files={designFiles}
                            onRemove={(file) => setDesignFiles(prev => prev.filter(f => f !== file))}
                            label="Upload .dst, .pes, .emb files"
                            accept={{
                                'application/x-dst': ['.dst'],
                                'application/x-pes': ['.pes'],
                                'application/x-emb': ['.emb'],
                                // Fallback for broader acceptance if mime types are tricky, but validation logic also handles it
                                'application/octet-stream': ['.dst', '.pes', '.emb']
                            }}
                            maxFiles={5}
                        />
                        {errors.files && <span className={styles.errorMessage}>{errors.files}</span>}
                    </div>
                </section>

                <div className={styles.actions}>
                    <Button variant="secondary" onClick={() => router.push('/designs')}>
                        Cancel
                    </Button>
                    {/* Buttons could be passed or rendered here. For simplicity rendering here and exposing handlers */}
                    <Button variant="secondary" onClick={() => handleFormSubmit('DRAFT')}>Save as Draft</Button>
                    <Button variant="primary" onClick={() => handleFormSubmit('PUBLISHED')} isLoading={isLoading}>
                        {mode === 'create' ? 'Publish Design' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DesignForm;
