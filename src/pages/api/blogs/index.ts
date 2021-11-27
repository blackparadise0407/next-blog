import type { NextApiRequest, NextApiResponse } from 'next';

import Blogs from '@/models/blogs';
import dbConnect from '@/lib/database';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<any>>
) {
    await dbConnect();
    const { method } = req;

    if (method === 'GET') {
        const { q = '', type } = req.query;
        const pattern = new RegExp(q as string, 'i');
        // try {
        //     return res.send({ data: {}, message: 'OK' });
        // } catch (e) {
        //     return res.status(403).json({ message: 'Insufficient permission' });
        // }
    }
}
