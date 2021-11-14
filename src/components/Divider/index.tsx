import clsx from 'clsx';

import styles from './styles.module.css';

export default function Divider() {
    return (
        <div
            className={clsx('relative w-ful !my-2', styles.divider)}
            style={{ height: '1px' }}
        ></div>
    );
}
