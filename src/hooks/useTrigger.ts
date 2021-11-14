import { useCallback, useState } from 'react';

export default function useTrigger(initialValue = false) {
    const [isOpen, setIsOpen] = useState(initialValue);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return {
        isOpen,
        open,
        close,
        trigger,
    };
}
