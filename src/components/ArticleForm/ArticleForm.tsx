import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import {
    AiOutlineClose,
    AiOutlineCopy,
    AiOutlineFileDone,
    AiOutlinePicture,
} from 'react-icons/ai';
import { debounce, isArray } from 'lodash';

import tagsApi from '@/client-apis/tags';

import ArticlePreview from './ArticlePreview';
import { Button } from '../Button';
import { Input } from '../Input';
import { Logo } from '../Logo';
import tipsData from './tips.json';
import { ArticleValue, TagOpts } from '.';

type ArticleFormProps = {
    value?: ArticleValue;
    onPublish?: (v: ArticleValue, cb: ErrorCb) => void;
};

const _getTagsOpts = (data: ITag[]) => {
    if (!!data?.length) {
        const clone: TagOpts[] = data.map((tag) => ({
            label: tag.name,
            value: tag.id,
        }));
        return clone;
    }
    return [];
};

export default function ArticleForm({
    value = {
        title: '',
        tags: [],
        content: '',
        cover_photo: '',
    },
    onPublish,
}: ArticleFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [innerValue, setInnerValue] = useState<ArticleValue>(value);
    const [preview, setPreview] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchedOpts, setSearchedOpts] = useState<Array<TagOpts>>([]);
    const [tagOpts, setTagOpts] = useState<Array<TagOpts>>([]);
    const [offSetTop, setOffSetTop] = useState<number>(50);
    const [tips, setTips] = useState<{ title: string; description: string }>(
        tipsData.title
    );
    const titleRef = useRef<HTMLInputElement>(null);

    const handleTitleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        setOffSetTop(e.target.offsetTop);
        setTips(tipsData.title);
    };

    const handleTagsFocus = (e: any) => {
        setOffSetTop(170);
        setTips(tipsData.tags);
    };

    const handleContentFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setOffSetTop(e.target.offsetTop);
        setTips(tipsData.content);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebounceSearch = useCallback(
        debounce(async (nextValue: string) => {
            if (nextValue) {
                const { data } = await tagsApi.getAll(nextValue);
                const opts = _getTagsOpts(data);
                setSearchedOpts(opts);
            }
        }, 500),
        []
    );

    const handleSearchInputChange = (v: string) => {
        setInputValue(v);
        handleDebounceSearch(v);
        if (!v) {
            setSearchedOpts([]);
        }
    };

    const handleFieldsOnChange = useCallback((e: any) => {
        setInnerValue((prev) => {
            if (isArray(e)) {
                return { ...prev, tags: e };
            }
            return { ...prev, [e.target.name]: e.target.value };
        });
    }, []);

    const handlePreview = () => {
        setPreview(true);
    };

    const handleEdit = () => {
        setPreview(false);
    };

    const handlePublish = () => {
        setIsLoading(true);
        onPublish?.(innerValue, (err) => {
            if (err) {
            }
            reInitState();
        });
    };

    const reInitState = useCallback(() => {
        setIsLoading(false);
        setInnerValue({
            tags: [],
            title: '',
            content: '',
            cover_photo: '',
        });
        setInputValue('');
    }, []);

    useEffect(() => {
        async function eff() {
            try {
                const { data } = await tagsApi.getCommon();
                const opts = _getTagsOpts(data);
                setTagOpts(opts);
            } catch (_) {}
        }
        eff();
    }, []);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    useEffect(() => {
        return () => {
            reInitState();
        };
    }, []);

    return (
        <div className="relative grid grid-cols-10 gap-x-0 md:gap-x-10 bg-gray-100 h-screen px-2 md:px-20 xl:px-48 overflow-y-hidden">
            <div className="col-span-10 md:col-span-7">
                <div className="w-full flex py-4 items-center">
                    <Logo />
                    <span className="text-sm font-medium ml-2">
                        {preview ? 'Preview' : 'Create post'}
                    </span>
                    <div className="flex-grow"></div>
                    <div className="flex space-x-2">
                        <Button
                            type={!preview ? 'primary' : 'default'}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            type={preview ? 'primary' : 'default'}
                            onClick={handlePreview}
                        >
                            Preview
                        </Button>
                        <Button
                            type="ghost"
                            className="!bg-gray-100 hover:!bg-gray-200 md:absolute md:top-2 md:right-2"
                            icon={<AiOutlineClose strokeWidth={30} size={16} />}
                        />
                    </div>
                </div>
                {preview ? (
                    <ArticlePreview value={innerValue} />
                ) : (
                    <div
                        className="flex flex-col bg-white w-full rounded-md border border-gray-300"
                        style={{ height: 'calc(100vh - 11rem)' }}
                    >
                        <div className="px-5 md:px-10 pb-2 md:pb-4 pt-6 md:pt-10">
                            <input
                                ref={titleRef}
                                name="title"
                                className="outline-none font-black text-xl md:text-4xl !leading-6 mb-2 w-full bg-transparent placeholder-gray-400"
                                placeholder="New post title here..."
                                value={innerValue?.title}
                                onChange={handleFieldsOnChange}
                                onFocus={handleTitleFocus}
                            />
                            <Select
                                className="text-xs"
                                placeholder="Select up to 4 tags..."
                                onFocus={handleTagsFocus}
                                options={
                                    !!searchedOpts.length
                                        ? searchedOpts
                                        : tagOpts
                                }
                                value={innerValue.tags}
                                inputValue={inputValue}
                                onInputChange={handleSearchInputChange}
                                onChange={handleFieldsOnChange}
                                isMulti
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
                            name="content"
                            className="outline-none flex-grow resize-none font-normal text-xs md:text-sm px-5 md:px-10 py-4 w-full bg-transparent text-justify placeholder-gray-400"
                            placeholder="Write your post content here..."
                            value={innerValue?.content}
                            onChange={handleFieldsOnChange}
                            onFocus={handleContentFocus}
                        />
                    </div>
                )}
                <div className="flex space-x-5 mt-5">
                    <Button
                        loading={isLoading}
                        type="primary"
                        onClick={handlePublish}
                    >
                        Publish
                    </Button>
                    <Button type="ghost">Save draft</Button>
                </div>
            </div>
            {!preview && (
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
            )}
        </div>
    );
}
