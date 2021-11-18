import clsx from 'clsx';

import styles from './styles.module.css';

type Props = {};

export default function Footer({}: Props) {
    return (
        <div
            className={clsx(
                styles.footer,
                'w-full flex flex-col justify-center px-2 py-5 xl:px-32 font-medium text-center text-sm bg-gray-300'
            )}
        >
            <span className="text-xs md:text-base leading-4 md:leading-5">
                Dev community Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Quia voluptates mollitia explicabo deleniti, quasi modi
                vel! Voluptatibus perspiciatis quisquam fuga!
            </span>
            <span className="font-normal text-xs md:text-md text-gray-500 mt-5">
                Made with love and{' '}
                <a
                    className="text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://nextjs.org/"
                >
                    Next
                </a>
                . Kyle PHAM © 2021 - 2021.
            </span>
        </div>
    );
}
