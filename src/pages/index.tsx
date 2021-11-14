import { BlogCard, Button, IconButton } from 'components';
import type { NextPage } from 'next';
import { AiFillEye } from 'react-icons/ai';

const Home: NextPage = () => {
    return (
        <div>
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
        </div>
    );
};

export default Home;
