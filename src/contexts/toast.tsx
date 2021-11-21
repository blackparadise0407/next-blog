import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from 'react';

import { ToastItem } from '@/components/ToastItem';

type ToastProviderProps = {
    children: ReactNode | JSX.Element;
};

const initialState: IToastContext = {
    items: [],
    enqueue: () => {},
};

const ToastContext = createContext<IToastContext>(initialState);

export function ToastProvider({ children }: ToastProviderProps) {
    const [items, setItems] = useState<Array<IToastItem>>([]);

    const enqueue = useCallback((message: string, opts: IToastOptions = {}) => {
        setItems((prev) => {
            const clone = [...prev];
            clone.push({
                id: new Date().getTime().toString(),
                title: opts.title,
                description: message,
                variant: opts.variant,
            });
            return clone;
        });
    }, []);

    const _handleDeleteToast = useCallback((uid: string) => {
        setItems((prev) => {
            const foundIndex = prev.findIndex((i) => i.id === uid);
            if (foundIndex > -1) {
                const clone = [...prev];
                clone.splice(foundIndex, 1);
                return clone;
            } else return prev;
        });
    }, []);

    return (
        <ToastContext.Provider value={{ items, enqueue }}>
            {!!items.length && (
                <div className="fixed top-2 right-2 z-50 space-y-4">
                    {items.map((i) => (
                        <ToastItem
                            autoClose={4000}
                            key={i.id}
                            data={i}
                            onDelete={_handleDeleteToast}
                        />
                    ))}
                </div>
            )}
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}
