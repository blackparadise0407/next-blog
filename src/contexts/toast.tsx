import { ToastItem } from '@/components/ToastItem';
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const initialState: IToastContext = {
    items: [],
    enqueue: () => {},
};

type ToastProviderProps = {
    children: ReactNode | JSX.Element;
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

    const handleDeleteToast = (id: string) => {
        setItems((prev) => {
            const foundIndex = prev.findIndex((i) => i.id === id);
            if (foundIndex > -1) {
                const clone = [...prev];
                clone.splice(foundIndex, 1);
                return clone;
            } else return prev;
        });
    };

    return (
        <ToastContext.Provider value={{ items, enqueue }}>
            {!!items.length && (
                <div className="fixed top-2 right-2 z-50 space-y-2">
                    {items.map((i) => (
                        <ToastItem
                            key={i.id}
                            data={i}
                            onDelete={handleDeleteToast}
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
