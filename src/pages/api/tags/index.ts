import nextConnect from 'next-connect';

import ncOpts from '@/api-lib/ncOpts';
import { TagServices } from '@/api-lib/services';
import dbConnect from '@/lib/database';

const handler = nextConnect(ncOpts);

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
