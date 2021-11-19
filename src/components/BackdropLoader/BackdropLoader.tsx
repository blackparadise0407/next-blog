import styles from './styles.module.css';

export default function BackdropLoader() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 opacity-60 grid place-items-center">
            <div className={styles.loader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
