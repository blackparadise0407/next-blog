import Link from 'next/link';

export default function Logo() {
    return (
        <div className="font-bold bg-blue-600 text-white px-3 py-1 rounded text-lg uppercase tracking-wider">
            <Link href="/">Prism</Link>
        </div>
    );
}
