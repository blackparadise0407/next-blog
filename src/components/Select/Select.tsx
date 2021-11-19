import useOnClickOutside from '@/hooks/useOnClickOutside';
import useTrigger from '@/hooks/useTrigger';
import clsx from 'clsx';
import {
    ChangeEvent,
    FocusEventHandler,
    HTMLProps,
    useRef,
    useState,
} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { OptionType } from '.';
import { Input } from '../Input';
import Option from './Option';

export type SearchProps = {
    options?: Array<OptionType>;
    value?: number | string | undefined | null;
    onChange?: (value: any) => void;
} & HTMLProps<HTMLSelectElement>;

export default function Select({
    options = [],
    onChange,
    onFocus,
}: SearchProps) {
    const elRef = useRef(null);
    const [selectedValue, setSelectedValue] = useState('');
    const { isOpen, open, close } = useTrigger(false);
    useOnClickOutside(elRef, close);

    const handleChange = (value: any) => {
        onChange?.(value);
        setSelectedValue(value);
        close();
    };

    const handleFocus = (e: any) => {
        onFocus?.(e);
        open();
    };

    return (
        <div className="relative" ref={elRef}>
            <Input onFocus={handleFocus} value={selectedValue} readOnly />
            {isOpen && (
                <div className="absolute bg-white rounded border border-gray-300 shadow-lg top-[45px] px-2 w-full">
                    {options.map((opt) => (
                        <Option
                            key={opt.value}
                            value={opt.value}
                            onSelect={handleChange}
                        >
                            {opt.label}
                        </Option>
                    ))}
                </div>
            )}
            <AiFillCaretDown
                className={clsx(
                    'absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 transition-transform',
                    isOpen && 'rotate-180'
                )}
                size={18}
            />
        </div>
    );
}
