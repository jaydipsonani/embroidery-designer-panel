import { motion } from 'framer-motion';
import styles from './GlobalLoader.module.scss';

const GlobalLoader = () => {
    return (
        <motion.div
            className={styles.loaderContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.spinner}></div>
        </motion.div>
    );
};

export default GlobalLoader;
