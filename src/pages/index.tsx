import type { NextPage } from 'next';
import { AiFillEye } from 'react-icons/ai';

import { BlogCard } from '@/components/BlogCard';

const Home: NextPage = () => {
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <div className="left bg-white rounded-md border border-gray-200 w-full h-28 hidden sm:block"></div>
            <div className="col-span-1 md:col-span-2 space-y-4">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
            <div className="right h-[1000px] bg-white rounded-md border border-gray-200 w-full"></div>
        </div>
    );
};

export default Home;
