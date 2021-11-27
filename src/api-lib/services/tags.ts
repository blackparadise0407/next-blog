import Tags from '@/models/tags';

const pattern = (q: string) => new RegExp(q as string, 'i');

export async function getAllTags(q: string = '') {
    const data = await Tags.find({
        name: pattern(q),
    });
    return data as ITag[];
}

export async function getTopTags(q: string = '', type: 'common' = 'common') {
    const data = await Tags.aggregate([
        { $sort: { used_score: -1 } },
        { $limit: 20 },
        { $group: { _id: null, avg: { $avg: '$used_score' } } },
    ]);
    const average = data?.length ? data[0].avg : 0;
    const tags = await Tags.find({
        $and: [
            { used_score: { $gte: average } },
            { name: { $regex: pattern(q) } },
        ],
    }).limit(20);
    return tags as ITag[];
}
