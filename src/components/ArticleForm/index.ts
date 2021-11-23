export type ArticleValue = {
    title?: string;
    content?: string;
    tags?: TagOpts[];
    cover_photo?: string;
};

export type TagOpts = {
    label: string;
    value: string;
};

export { default as ArticleForm } from './ArticleForm';
