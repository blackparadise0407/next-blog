import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArticleValue } from '.';
import PrismJs from 'prismjs';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-go.min';
import 'prismjs/components/prism-yaml.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-markup.min';
import 'prismjs/components/prism-powershell.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-jsx.min';

type ArticlePreviewProps = {
    value?: ArticleValue;
};

export default function ArticlePreview({ value }: ArticlePreviewProps) {
    useEffect(() => {
        PrismJs.highlightAll();
    }, []);

    return (
        <div
            className="flex flex-col bg-white w-full rounded-md border border-gray-300 p-5 overflow-y-auto"
            style={{ height: 'calc(100vh - 11rem)' }}
        >
            <div className="text-4xl font-black !leading-8 mb-3">
                {value?.title}
            </div>
            <div className="text-sm text-gray-600 mb-2">
                {value?.tags.map((tag, idx) => (
                    <span key={tag.value}>
                        #{tag.label} {idx === value.tags.length - 1 ? '' : ', '}
                    </span>
                ))}
            </div>
            <ReactMarkdown className="h-auto">{value?.content}</ReactMarkdown>
        </div>
    );
}
