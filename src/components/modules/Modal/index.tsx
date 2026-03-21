import React from 'react';
import { Modal as BsModal, Button } from 'react-bootstrap';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    return (
        <BsModal
            show={isOpen}
            onHide={onClose}
            centered
            className={styles.bootstrapModal}
            contentClassName={styles.bootstrapModalContent}
        >
            {title && (
                <BsModal.Header closeButton>
                    <BsModal.Title className={styles.title}>{title}</BsModal.Title>
                </BsModal.Header>
            )}
            <BsModal.Body className={styles.content}>
                {children}
            </BsModal.Body>
            {footer && (
                <BsModal.Footer className={styles.footer}>
                    {footer}
                </BsModal.Footer>
            )}
        </BsModal>
    );
};

export default Modal;
