import Link from 'next/link';

import { Avatar, Button } from 'components';

type BlogCardProps = {
    data?: IBlog;
};

export default function BlogCard({ data }: BlogCardProps) {
    return (
        <div className="w-full bg-white rounded-md border-gray-300 border my-2">
            <div className="flex pt-4 pb-2 px-4 text-xs md:text-sm">
                <Avatar size={40} />
                <div className="flex flex-col ml-2">
                    <p className="font-medium">
                        <span className="cursor-pointer transition-colors text-gray-700 hover:text-black">
                            Author
                        </span>
                    </p>
                    <span className="text-xs transition-colors cursor-pointer text-gray-400 hover:text-gray-800">
                        Nov 20 (2 days ago)
                    </span>
                </div>
            </div>
            <div className="py-2 px-4">
                <span className="text-lg md:text-xl font-bold truncate hover:text-blue-600">
                    <Link href="/title">Long title has long words</Link>
                </span>
            </div>
            <div className="tags pb-3 px-4">
                <ul className="flex text-xs md:text-sm space-x-2 flex-wrap">
                    <li className="px-1 py-1 border border-transparent hover:border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                        #c-sharp
                    </li>
                    <li className="px-1 py-1 border border-transparent hover:border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                        #docker
                    </li>
                    <li className="px-1 py-1 border border-transparent hover:border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                        #devops
                    </li>
                </ul>
            </div>
            <div className="flex px-4 pb-4 pt-0 items-center">
                <div className="text-xs md:text-sm text-gray-500 space-x-4">
                    <span className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                        20 Likes
                    </span>
                    <span className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                        12 Comments
                    </span>
                </div>
                <div className="flex-grow"></div>
                <Button size="middle" type="default">
                    Save
                </Button>
            </div>
        </div>
    );
}
