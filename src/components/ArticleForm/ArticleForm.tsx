import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import {
    AiOutlineCopy,
    AiOutlineFileDone,
    AiOutlinePicture,
} from 'react-icons/ai';
import { Button } from '../Button';
import { Input } from '../Input';
import { Logo } from '../Logo';
import tipsData from './tips.json';

type ArticleFormProps = {
    value?: string;
};

export default function ArticleForm({}: ArticleFormProps) {
    const [offSetTop, setOffSetTop] = useState<number>(90);
    const [tips, setTips] = useState<{ title: string; description: string }>(
        tipsData.title
    );
    const titleRef = useRef<HTMLInputElement>(null);

    const handleTitleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        setOffSetTop(e.target.offsetTop);
        setTips(tipsData.title);
    };

    const handleContentFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setOffSetTop(e.target.offsetTop);
        setTips(tipsData.content);
    };

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    return (
        <>
            <div className="col-span-10 md:col-span-7">
                <div className="w-full flex py-4 items-center">
                    <Logo />
                    <div className="flex-grow"></div>
                    <div className="flex space-x-2">
                        <Button type="primary">Edit</Button>
                        <Button type="default">Preview</Button>
                    </div>
                </div>
                <div
                    className="flex flex-col bg-white w-full rounded-md border border-gray-300"
                    style={{ height: 'calc(100vh - 11rem)' }}
                >
                    <div className="px-5 md:px-10 pb-2 md:pb-4 pt-6 md:pt-10">
                        <input
                            ref={titleRef}
                            className="outline-none font-black text-xl md:text-4xl !leading-6 mb-2 w-full bg-transparent placeholder-gray-400"
                            placeholder="New post title here..."
                            onFocus={handleTitleFocus}
                        />
                        <Select
                            className="text-xs"
                            isMulti
                            options={[
                                { value: 'chocolate', label: 'Chocolate' },
                                { value: 'strawberry', label: 'Strawberry' },
                                { value: 'vanilla', label: 'Vanilla' },
                            ]}
                        />
                    </div>
                    <div className="px-5 md:px-10 py-2 bg-gray-50 flex items-center space-x-4">
                        <Button
                            icon={<AiOutlinePicture size={20} />}
                            type="ghost"
                        >
                            Upload image
                        </Button>
                        {false && (
                            <>
                                <Input className="w-80" readOnly />
                                <Button
                                    icon={
                                        true ? (
                                            <AiOutlineCopy size={20} />
                                        ) : (
                                            <AiOutlineFileDone size={20} />
                                        )
                                    }
                                    type="ghost"
                                >
                                    Copy
                                </Button>
                            </>
                        )}
                    </div>
                    <textarea
                        className="outline-none flex-grow resize-none font-normal text-xs md:text-sm px-5 md:px-10 py-4 w-full bg-transparent text-justify placeholder-gray-400"
                        placeholder="Write your post content here..."
                        onFocus={handleContentFocus}
                    />
                </div>
                <div className="flex space-x-5 mt-5">
                    <Button type="primary">Publish</Button>
                    <Button type="ghost">Save draft</Button>
                </div>
            </div>
            <div
                className="hidden sticky top-5 bottom-5 md:flex flex-col col-span-3 transition-transform"
                style={{
                    transform: `translateY(${offSetTop - 20}px)`,
                }}
            >
                <span className="font-semibold text-lg">{tips.title}</span>
                <span className="text-xs md:text-sm text-gray-500">
                    {tips.description}
                </span>
            </div>
        </>
    );
}
