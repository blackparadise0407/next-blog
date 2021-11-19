import { RefObject, useEffect } from 'react';

export default function useOnClickOutside(
    ref: RefObject<any>,
    callback: () => void
) {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}
