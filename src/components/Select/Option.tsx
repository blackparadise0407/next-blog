import { ReactNode, useCallback } from 'react';
import { OptionType } from '.';

export type OptionProps = {
    children: ReactNode | JSX.Element;
    onSelect: (value: any) => void;
} & Omit<OptionType, 'label'>;

export default function Option({ children, value, onSelect }: OptionProps) {
    const handleSelect = () => {
        onSelect(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    return (
        <div
            className="text-xs sm:text-sm text-black hover:text-blue-500 hover:bg-gray-100 px-4 py-2 rounded my-2 cursor-pointer transition-colors"
            onClick={handleSelect}
        >
            {children}
        </div>
    );
}
