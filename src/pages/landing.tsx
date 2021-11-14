import type { NextPage } from 'next';
import Image from 'next/image';
import businessImg from 'assets/images/business.jpg';
import style from 'styles/landing.module.css';

const Landing: NextPage = () => {
    return (
        <div className={`${style.landingPage} h-full`}>
            <Image
                width={100}
                layout="fill"
                objectFit="contain"
                src={businessImg}
                alt="business"
            />
        </div>
    );
};

export default Landing;
