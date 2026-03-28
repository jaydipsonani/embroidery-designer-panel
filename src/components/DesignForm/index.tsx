import React, { useState, useEffect } from 'react';
import Input from '../modules/Input';
import Button from '../modules/Button';
import FileUpload from '../FileUpload';
import styles from './DesignForm.module.scss';
import { useRouter } from 'next/router';
import { toastError } from '../../lib';
import { FileRejection } from 'react-dropzone';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FiInfo } from 'react-icons/fi';

// Constants
const DESIGN_TYPES = [
    'Embroidery Design',
    'Sketch Design',
    'Jewelry Design',
    'Hot Fix Design',
    'TDS Design',
    'Texture Design & Mastering',
    'Digital Print Design',
    'Print Design Planning',
    'Beads Embroidery Design'
];

const CATEGORIES = ['Floral', 'Abstract', 'Animals', 'Kids', 'Logos', 'Traditional'];
const FORMATS = ['DST', 'PES', 'EMB']; 
const HOOP_SIZES = ['4x4', '5x7', '6x10', '8x8', '8x12', 'Commercial'];

// Additional Type Constants
const SKETCH_TYPES = ['Pencil', 'Charcoal', 'Graphite', 'Digital', 'Watercolor'];
const PAPER_SIZES = ['A4', 'A3', 'A2', 'Custom', 'Other'];
const JEWELRY_TYPES = ['Ring', 'Pendant', 'Bracelet', 'Earrings', 'Necklace'];
const METAL_TYPES = ['Gold', 'Silver', 'Platinum', 'Rose Gold'];
const HOTFIX_STONE_SIZES = ['SS6', 'SS10', 'SS16', 'SS20'];
const HOTFIX_STONE_TYPES = ['Rhinestone', 'Octagon', 'Half Round', 'Pearl'];
const REPEAT_TYPES = ['Full Drop', 'Half Drop', 'Brick', 'Mirror'];
const RESOLUTIONS = ['1K', '2K', '4K', '8K'];
const MAP_TYPES_OPTS = ['Diffuse', 'Normal', 'Displacement', 'Specular'];
const COLOR_MODES = ['CMYK', 'RGB'];
const BEAD_SIZES = ['11/0', '8/0', '6/0', '2mm', '3mm', '4mm'];
const BEAD_TYPES = ['Seed Beads', 'Crystals', 'Pearls', 'Bugle Beads', 'Gemstones'];

const designImage = `/images/designImage.jpg`; 

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
    const [designType, setDesignType] = useState(initialValues?.designType || 'Embroidery Design');
    const [title, setTitle] = useState(initialValues?.title || '');
    const [price, setPrice] = useState(initialValues?.price || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [category, setCategory] = useState(initialValues?.category || '');
    
    // Embroidery Specific
    const [stitchingCount, setStitchingCount] = useState(initialValues?.stitchingCount || '');
    const [needleCount, setNeedleCount] = useState(initialValues?.needleCount || '');
    const [hoopSize, setHoopSize] = useState(initialValues?.hoopSize || '');
    const [selectedFormats, setSelectedFormats] = useState<string[]>(initialValues?.selectedFormats || []);

    // Sketch Specific
    const [sketchType, setSketchType] = useState(initialValues?.sketchType || '');
    const [paperSize, setPaperSize] = useState(initialValues?.paperSize || '');
    const [isDigital, setIsDigital] = useState(initialValues?.isDigital || false);

    // Jewelry Specific
    const [jewelryType, setJewelryType] = useState(initialValues?.jewelryType || '');
    const [metalType, setMetalType] = useState(initialValues?.metalType || '');
    const [stoneType, setStoneType] = useState(initialValues?.stoneType || '');

    // Hot Fix Specific
    const [stoneSize, setStoneSize] = useState(initialValues?.stoneSize || '');
    const [hotfixStoneType, setHotfixStoneType] = useState(initialValues?.hotfixStoneType || '');
    const [stoneCount, setStoneCount] = useState(initialValues?.stoneCount || '');

    // TDS Specific
    const [repeatType, setRepeatType] = useState(initialValues?.repeatType || '');
    const [fabricType, setFabricType] = useState(initialValues?.fabricType || '');

    // Texture Specific
    const [resolution, setResolution] = useState(initialValues?.resolution || '');
    const [selectedMapTypes, setSelectedMapTypes] = useState<string[]>(initialValues?.selectedMapTypes || []);

    // Digital Print Specific
    const [printSize, setPrintSize] = useState(initialValues?.printSize || '');
    const [colorMode, setColorMode] = useState(initialValues?.colorMode || '');
    const [dpi, setDpi] = useState(initialValues?.dpi || '');

    // Print Design Planning Specific
    const [layoutType, setLayoutType] = useState(initialValues?.layoutType || '');
    const [suggestedMaterial, setSuggestedMaterial] = useState(initialValues?.suggestedMaterial || '');

    // Beads Embroidery Specific
    const [beadSize, setBeadSize] = useState(initialValues?.beadSize || '');
    const [beadType, setBeadType] = useState(initialValues?.beadType || '');
    const [beadColorCount, setBeadColorCount] = useState(initialValues?.beadColorCount || '');

    // Files
    const [previewImage, setPreviewImage] = useState<File[]>([]); // Logic for initial files to be added if needed
    const [designFiles, setDesignFiles] = useState<File[]>([]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "Design name is required";
        if (!price || Number(price) <= 0) newErrors.price = "Price must be greater than zero";
        if (!category) newErrors.category = "Please select a category";
        if (!designType) newErrors.designType = "Please select a design type";

        // Conditional Validation
        if (designType === 'Embroidery Design') {
            if (!stitchingCount || Number(stitchingCount) <= 0) newErrors.stitchingCount = "Stitching count is required";
            if (!needleCount || Number(needleCount) <= 0) newErrors.needleCount = "Needle count is required";
            if (!hoopSize) newErrors.hoopSize = "Please select a hoop size";
            if (selectedFormats.length === 0) newErrors.formats = "Select at least one supported format";
        } else if (designType === 'Sketch Design') {
            if (!sketchType) newErrors.sketchType = "Please select a sketch type";
            if (!paperSize) newErrors.paperSize = "Please select a paper size";
        } else if (designType === 'Jewelry Design') {
            if (!jewelryType) newErrors.jewelryType = "Please select a jewelry type";
            if (!metalType) newErrors.metalType = "Please select a metal type";
        } else if (designType === 'Hot Fix Design') {
            if (!stoneSize) newErrors.stoneSize = "Please select a stone size";
            if (!hotfixStoneType) newErrors.hotfixStoneType = "Please select a stone type";
        } else if (designType === 'TDS Design') {
            if (!repeatType) newErrors.repeatType = "Please select a repeat type";
        } else if (designType === 'Texture Design & Mastering') {
            if (!resolution) newErrors.resolution = "Please select a resolution";
        } else if (designType === 'Digital Print Design') {
            if (!printSize) newErrors.printSize = "Print size is required";
            if (!colorMode) newErrors.colorMode = "Please select a color mode";
        } else if (designType === 'Print Design Planning') {
            if (!layoutType) newErrors.layoutType = "Layout type is required";
        } else if (designType === 'Beads Embroidery Design') {
            if (!stitchingCount || Number(stitchingCount) <= 0) newErrors.stitchingCount = "Stitching count is required";
            if (!beadSize) newErrors.beadSize = "Please select a bead size";
            if (!beadType) newErrors.beadType = "Please select a bead type";
        }

        // In edit mode, we might not require re-uploading files if they already exist (logic can be refined)
        // For now enforcing strictly as requested for Create
        if (mode === 'create') {
            if (previewImage.length === 0) newErrors.preview = "Preview image is mandatory";
            if (designFiles.length === 0) newErrors.files = "At least one embroidery file is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (status: 'DRAFT' | 'PENDING') => {
        if (status === 'PENDING' || status === 'DRAFT' && !validate()) {
            if (Object.keys(errors).length > 0) {
                toastError("Please fix the errors before submitting");
            }
            return;
        }

        const data = {
            designType,
            title,
            price,
            description,
            category,
            // Embroidery
            stitchingCount,
            needleCount,
            hoopSize,
            selectedFormats,
            // Sketch
            sketchType,
            paperSize,
            isDigital,
            // Jewelry
            jewelryType,
            metalType,
            stoneType,
            // Hot Fix
            stoneSize,
            hotfixStoneType,
            stoneCount,
            // TDS
            repeatType,
            fabricType,
            // Texture
            resolution,
            selectedMapTypes,
            // Digital Print
            printSize,
            colorMode,
            dpi,
            // Print Planning
            layoutType,
            suggestedMaterial,
            // Beads Embroidery
            beadSize,
            beadType,
            beadColorCount,
            // Media
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

        if (designFiles.length + files.length > 3) {
            toastError("Maximum limit is 3 files");
            return;
        }

        setDesignFiles(prev => [...prev, ...files]);
    };

    return (
        <div className={styles.formGrid}>
            <div className={styles.column}>
                <section className={styles.card}>
                    <h3>Basic Information</h3>
                    <div className={styles.inputWrapper}>
                        <label className={styles.label}>Design Type</label>
                        <select
                            className={`${styles.select} ${errors.designType ? styles.hasError : ''}`}
                            value={designType}
                            onChange={(e) => setDesignType(e.target.value)}
                        >
                            <option value="">Select Design Type...</option>
                            {DESIGN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.designType && <span className={styles.errorMessage}>{errors.designType}</span>}
                    </div>

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

                    {designType === 'Embroidery Design' && (
                        <>
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
                                <Input
                                    label="Needle Count"
                                    type="number"
                                    placeholder="e.g. 12"
                                    value={needleCount}
                                    onChange={(e) => setNeedleCount(e.target.value)}
                                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                    error={errors.needleCount}
                                />
                            </div>

                            <div className={styles.row}>
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
                        </>
                    )}

                    {designType === 'Sketch Design' && (
                        <>
                            <div className={styles.row}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Sketch Type</label>
                                    <select
                                        className={`${styles.select} ${errors.sketchType ? styles.hasError : ''}`}
                                        value={sketchType}
                                        onChange={(e) => setSketchType(e.target.value)}
                                    >
                                        <option value="">Select Sketch Type...</option>
                                        {SKETCH_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    {errors.sketchType && <span className={styles.errorMessage}>{errors.sketchType}</span>}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Paper Size</label>
                                    <select
                                        className={`${styles.select} ${errors.paperSize ? styles.hasError : ''}`}
                                        value={paperSize}
                                        onChange={(e) => setPaperSize(e.target.value)}
                                    >
                                        <option value="">Select Paper Size...</option>
                                        {PAPER_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.paperSize && <span className={styles.errorMessage}>{errors.paperSize}</span>}
                                </div>
                            </div>
                            <div className={styles.checkboxWrapper}>
                                <input 
                                    type="checkbox" 
                                    id="isDigital" 
                                    checked={isDigital} 
                                    onChange={(e) => setIsDigital(e.target.checked)} 
                                />
                                <label htmlFor="isDigital">Is Digital Sketch?</label>
                            </div>
                        </>
                    )}

                    {designType === 'Jewelry Design' && (
                        <>
                            <div className={styles.row}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Jewelry Type</label>
                                    <select
                                        className={`${styles.select} ${errors.jewelryType ? styles.hasError : ''}`}
                                        value={jewelryType}
                                        onChange={(e) => setJewelryType(e.target.value)}
                                    >
                                        <option value="">Select Jewelry Type...</option>
                                        {JEWELRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    {errors.jewelryType && <span className={styles.errorMessage}>{errors.jewelryType}</span>}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Metal Type</label>
                                    <select
                                        className={`${styles.select} ${errors.metalType ? styles.hasError : ''}`}
                                        value={metalType}
                                        onChange={(e) => setMetalType(e.target.value)}
                                    >
                                        <option value="">Select Metal Type...</option>
                                        {METAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    {errors.metalType && <span className={styles.errorMessage}>{errors.metalType}</span>}
                                </div>
                            </div>
                            <Input
                                label="Stone Type"
                                placeholder="e.g. Diamond, Ruby"
                                value={stoneType}
                                onChange={(e) => setStoneType(e.target.value)}
                            />
                        </>
                    )}

                    {designType === 'Hot Fix Design' && (
                        <div className={styles.row}>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Stone Size</label>
                                <select
                                    className={`${styles.select} ${errors.stoneSize ? styles.hasError : ''}`}
                                    value={stoneSize}
                                    onChange={(e) => setStoneSize(e.target.value)}
                                >
                                    <option value="">Select Stone Size...</option>
                                    {HOTFIX_STONE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {errors.stoneSize && <span className={styles.errorMessage}>{errors.stoneSize}</span>}
                            </div>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Stone Type</label>
                                <select
                                    className={`${styles.select} ${errors.hotfixStoneType ? styles.hasError : ''}`}
                                    value={hotfixStoneType}
                                    onChange={(e) => setHotfixStoneType(e.target.value)}
                                >
                                    <option value="">Select Stone Type...</option>
                                    {HOTFIX_STONE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {errors.hotfixStoneType && <span className={styles.errorMessage}>{errors.hotfixStoneType}</span>}
                            </div>
                        </div>
                    )}

                    {designType === 'TDS Design' && (
                        <div className={styles.row}>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Repeat Type</label>
                                <select
                                    className={`${styles.select} ${errors.repeatType ? styles.hasError : ''}`}
                                    value={repeatType}
                                    onChange={(e) => setRepeatType(e.target.value)}
                                >
                                    <option value="">Select Repeat Type...</option>
                                    {REPEAT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {errors.repeatType && <span className={styles.errorMessage}>{errors.repeatType}</span>}
                            </div>
                            <Input
                                label="Fabric Type"
                                placeholder="e.g. Cotton, Silk"
                                value={fabricType}
                                onChange={(e) => setFabricType(e.target.value)}
                            />
                        </div>
                    )}

                    {designType === 'Texture Design & Mastering' && (
                        <div className={styles.row}>
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Resolution</label>
                                <select
                                    className={`${styles.select} ${errors.resolution ? styles.hasError : ''}`}
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                >
                                    <option value="">Select Resolution...</option>
                                    {RESOLUTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {errors.resolution && <span className={styles.errorMessage}>{errors.resolution}</span>}
                            </div>
                        </div>
                    )}

                    {designType === 'Digital Print Design' && (
                        <div className={styles.row}>
                            <Input
                                label="Print Size"
                                placeholder="e.g. 10x12 inches"
                                value={printSize}
                                onChange={(e) => setPrintSize(e.target.value)}
                                error={errors.printSize}
                            />
                            <div className={styles.inputWrapper}>
                                <label className={styles.label}>Color Mode</label>
                                <select
                                    className={`${styles.select} ${errors.colorMode ? styles.hasError : ''}`}
                                    value={colorMode}
                                    onChange={(e) => setColorMode(e.target.value)}
                                >
                                    <option value="">Select Color Mode...</option>
                                    {COLOR_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                                {errors.colorMode && <span className={styles.errorMessage}>{errors.colorMode}</span>}
                            </div>
                            <Input
                                label="DPI (Resolution)"
                                type="number"
                                placeholder="e.g. 300"
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                            />
                        </div>
                    )}

                    {designType === 'Beads Embroidery Design' && (
                        <>
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
                                <Input
                                    label="Needle Count"
                                    type="number"
                                    placeholder="e.g. 12"
                                    value={needleCount}
                                    onChange={(e) => setNeedleCount(e.target.value)}
                                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                />
                            </div>
                            <div className={styles.row}>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Bead Size</label>
                                    <select
                                        className={`${styles.select} ${errors.beadSize ? styles.hasError : ''}`}
                                        value={beadSize}
                                        onChange={(e) => setBeadSize(e.target.value)}
                                    >
                                        <option value="">Select Bead Size...</option>
                                        {BEAD_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.beadSize && <span className={styles.errorMessage}>{errors.beadSize}</span>}
                                </div>
                                <div className={styles.inputWrapper}>
                                    <label className={styles.label}>Bead Type</label>
                                    <select
                                        className={`${styles.select} ${errors.beadType ? styles.hasError : ''}`}
                                        value={beadType}
                                        onChange={(e) => setBeadType(e.target.value)}
                                    >
                                        <option value="">Select Bead Type...</option>
                                        {BEAD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    {errors.beadType && <span className={styles.errorMessage}>{errors.beadType}</span>}
                                </div>
                            </div>
                            <Input
                                label="Bead Color Count"
                                type="number"
                                placeholder="e.g. 5"
                                value={beadColorCount}
                                onChange={(e) => setBeadColorCount(e.target.value)}
                                onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            />
                        </>
                    )}

                    {designType === 'Print Design Planning' && (
                        <div className={styles.row}>
                            <Input
                                label="Layout Type"
                                placeholder="e.g. Flyer, Poster"
                                value={layoutType}
                                onChange={(e) => setLayoutType(e.target.value)}
                                error={errors.layoutType}
                            />
                            <Input
                                label="Suggested Material"
                                placeholder="e.g. Glossy Paper"
                                value={suggestedMaterial}
                                onChange={(e) => setSuggestedMaterial(e.target.value)}
                            />
                        </div>
                    )}

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

                {designType === 'Embroidery Design' && (
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
                )}

                {designType === 'Texture Design & Mastering' && (
                    <section className={styles.card}>
                        <h3>Map Types</h3>
                        <div className={styles.tags}>
                            {MAP_TYPES_OPTS.map(map => (
                                <button
                                    type="button"
                                    key={map}
                                    className={`${styles.tag} ${selectedMapTypes.includes(map) ? styles.activeTag : ''}`}
                                    onClick={() => setSelectedMapTypes(prev => 
                                        prev.includes(map) ? prev.filter(m => m !== map) : [...prev, map]
                                    )}
                                >
                                    {map}
                                </button>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <div className={styles.column}>
                <section className={styles.card}>
                    <h3>Media & Files</h3>

                    <div className={styles.uploadSection}>
                        <div className={styles.labelWithInfo}>
                            <label className={styles.label}>Preview Image (Mandatory)</label>
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip id="preview-image-tooltip" className={styles.customTooltip}>
                                        <div className={styles.tooltipContent}>
                                            <p>Example of a high-quality design preview:</p>
                                            <div className={styles.tooltipImage}>
                                                <img 
                                                    src={designImage}
                                                    alt="Design Preview Example" 
                                                />
                                            </div>
                                            <small>Showcase your work with clear, well-lit photos or digital renderings.</small>
                                        </div>
                                    </Tooltip>
                                }
                            >
                                <span className={styles.infoIcon}>
                                    <FiInfo size={17} />
                                </span>
                            </OverlayTrigger>
                        </div>
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
                            maxFiles={3}
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
                    <Button variant="primary" onClick={() => handleFormSubmit('PENDING')} isLoading={isLoading}>
                        {mode === 'create' ? 'Submit for Review' : 'Update & Resubmit'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DesignForm;
