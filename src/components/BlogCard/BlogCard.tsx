import Link from 'next/link';
import { Avatar } from '../Avatar';
import { Button } from '../Button';

type BlogCardProps = {
    data?: IBlog;
};

export default function BlogCard({ data }: BlogCardProps) {
    return (
        <div className="w-full p-3 md:p-6 bg-white rounded-md border-gray-200 border">
            <div className="flex text-xs md:text-sm">
                <Avatar size={40} />
                <div className="flex flex-col ml-2">
                    <p className="text-sm font-medium tracking-tight">
                        <span className="cursor-pointer transition-colors text-gray-700 hover:text-black">
                            John Doe
                        </span>
                    </p>
                    <span className="text-xs transition-colors text-gray-400">
                        Nov 20 (2 days ago)
                    </span>
                </div>
            </div>
            <div className="pl-0 md:pl-[48px]">
                <div className="py-3">
                    <span className="text-lg md:text-xl font-bold  hover:text-blue-600">
                        <Link href="/title/hahaha">
                            How To: Build A Simple Search Bar in JavaScript
                        </Link>
                    </span>
                </div>
                <div className="tags pb-3 ">
                    <ul className="flex text-xs flex-wrap">
                        <li className="px-1 mr-2 py-0.5 border border-transparent hover:border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                            #c-sharp
                        </li>
                        <li className="px-1 mr-2 py-0.5 border border-transparent hover:border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                            #docker
                        </li>
                        <li className="px-1 mr-2 py-0.5 border border-transparent hover:border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                            #devops
                        </li>
                    </ul>
                </div>
                <div className="flex pt-0 items-center">
                    <div className="text-xs md:text-sm text-gray-500 space-x-4">
                        <span className="px-1.5 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                            20 Likes
                        </span>
                        <span className="px-1.5 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                            12 Comments
                        </span>
                    </div>
                    <div className="flex-grow"></div>
                    <Button size="small" type="default">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}
