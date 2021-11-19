import {
    AiOutlineCopy,
    AiOutlineFileDone,
    AiOutlinePicture,
} from 'react-icons/ai';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import {
    ChangeEvent,
    CSSProperties,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Logo } from '@/components/Logo';
import { Select } from '@/components/Select';

const NewBlogPage: PrismPage = () => {
    const [offSetTop, setOffSetTop] = useState<number>(90);
    const [tags, setTags] = useState<Array<ITag>>([]);
    const [tagsInputValue, setTagsInputValue] = useState('');
    const [tips, setTips] = useState<{ title: string; description: string }>({
        title: 'Writing a Great Post Title',
        description:
            'Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence. Use keywords where appropriate to help ensure people can find your post by search.',
    });
    const titleRef = useRef<HTMLInputElement>(null);

    const handleTitleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        setOffSetTop(e.target.offsetTop);
        setTips({
            title: 'Writing a Great Post Title',
            description:
                'Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence. Use keywords where appropriate to help ensure people can find your post by search.',
        });
    };

    // const handleTitleFocus = () => {
    //     setOffSetTop(90);
    // };

    const handleContentFocus = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setOffSetTop(e.target.offsetTop);
        setTips({
            title: 'Editor Basics',
            description:
                "Use Markdown to write and format posts. You can use Liquid tags to add rich content such as Tweets, YouTube videos, etc. In addition to images for the post's content, you can also drag and drop a cover image",
        });
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
                    style={{ height: 'calc(100vh - 12rem)' }}
                >
                    <div className="px-5 md:px-10 pb-2 md:pb-4 pt-6 md:pt-10">
                        <input
                            ref={titleRef}
                            className="outline-none font-black text-xl md:text-3xl mb-2 w-full bg-transparent placeholder-gray-400"
                            placeholder="New post title here..."
                            onFocus={handleTitleFocus}
                        />
                        <div className="relative">
                            <input
                                type="text"
                                className="border-none outline-none text-xs md:text-sm placeholder-gray-400"
                                placeholder="Add up to 4 tags..."
                            />
                            <div className="hidden absolute top-8 left-0 z-10 w-full bg-white rounded shadow p-2 text-sm">
                                tags shown
                            </div>
                            <Select
                                onChange={(v) => console.log(v)}
                                options={[{ label: 'Hello', value: 'vcl' }]}
                            />
                        </div>
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
                style={{ transform: `translateY(${offSetTop}px)` }}
            >
                <span className="font-semibold text-lg">{tips.title}</span>
                <span className="text-xs md:text-sm text-gray-500">
                    {tips.description}
                </span>
            </div>
        </>
    );
};

NewBlogPage.layout = 'article';
NewBlogPage.isPrivate = true;

export default NewBlogPage;
