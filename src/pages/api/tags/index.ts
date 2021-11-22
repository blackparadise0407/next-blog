import type { NextApiRequest, NextApiResponse } from 'next';

import Tags from '@/models/tags';
import dbConnect from '@/lib/database';
import nextConnect from 'next-connect';
import ncOpts from 'api-lib/ncOpts';
import { TagServices } from 'api-lib/db';

const handler = nextConnect(ncOpts);

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ApiResponse<any>>
// ) {
//     await dbConnect();
//     const { method } = req;

//     if (method === 'GET') {
//         const { q = '', type } = req.query;
//         const pattern = new RegExp(q as string, 'i');
//         try {
//             if (type === 'common') {
//                 const data = await Tags.aggregate([
//                     { $sort: { used_score: -1 } },
//                     { $limit: 20 },
//                     { $group: { _id: null, avg: { $avg: '$used_score' } } },
//                 ]);
//                 const average = data?.length ? data[0].avg : 0;
//                 const tags = await Tags.find({
//                     $and: [
//                         { used_score: { $gte: average } },
//                         { name: { $regex: pattern } },
//                     ],
//                 }).limit(20);
//                 return res.send({ data: tags, message: 'OK' });
//             }
//             const data = await Tags.find({
//                 name: pattern,
//             });
//             return res.send({ data, message: 'OK' });
//         } catch (e) {
//             return res.status(403).json({ message: 'Insufficient permission' });
//         }
//     }
// }

handler.get(async (req, res) => {
    const { q = '', type } = req.query;
    await dbConnect();
    if (type === 'common') {
        const data = await TagServices.getTopTags(q as string, type);
        return res.send({ data, message: 'OK' });
    }
    const data = await TagServices.getAllTags(q as string);
    return res.send({ data, message: 'OK' });
});

export default handler;
