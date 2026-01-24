import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import styles from './FileUpload.module.scss';
import Image from 'next/image';

import { FileRejection } from 'react-dropzone';

interface FileUploadProps {
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
    files: File[];
    onRemove: (file: File) => void;
    accept?: Record<string, string[]>;
    maxFiles?: number;
    label?: string;
    preview?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onDrop,
    files,
    onRemove,
    accept,
    maxFiles = 1,
    label = "Drag & drop files here, or click to select",
    preview = false
}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles
    });

    return (
        <div className={styles.container}>
            <div
                {...getRootProps()}
                className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${files.length > 0 && maxFiles === 1 && preview ? styles.hasFile : ''}`}
            >
                <input {...getInputProps()} />

                {files.length > 0 && maxFiles === 1 && preview ? (
                    <div className={styles.previewContainer}>
                        <img
                            src={URL.createObjectURL(files[0])}
                            alt="Preview"
                            className={styles.previewImage}
                        />
                        <div className={styles.overlay}>
                            <FiUploadCloud />
                            <span>Change Image</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <FiUploadCloud className={styles.icon} />
                        <p>{isDragActive ? "Drop the files here..." : label}</p>
                    </div>
                )}
            </div>

            {(!maxFiles || maxFiles > 1 || !preview) && files.length > 0 && (
                <ul className={styles.fileList}>
                    {files.map((file, index) => (
                        <li key={index} className={styles.fileItem}>
                            <FiFile className={styles.fileIcon} />
                            <span className={styles.fileName}>{file.name}</span>
                            <button
                                type="button"
                                onClick={() => onRemove(file)}
                                className={styles.removeButton}
                            >
                                <FiX />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileUpload;
