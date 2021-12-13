import ncOpts from '@/api-lib/ncOpts';
import { BlogServices } from '@/api-lib/services';
import dbConnect from '@/lib/database';
import { AdvancedResponse } from '@/shared/AdvancedResponse';
import { auth } from '@/shared/middlewares/auth';
import nextConnect from 'next-connect';

const handler = nextConnect(ncOpts);
handler.use(auth);
handler.get(async (req, res) => {
    return res.send(new AdvancedResponse({ data: {} }));
});

handler.post(async (req, res) => {
    await dbConnect();
    const { user } = req.session;
    const blog = req.body as IBlog;
    const savedBlog = await BlogServices.create(user, blog);
    return res.send(
        new AdvancedResponse({
            data: savedBlog,
            message: 'Create new blog successfully',
        })
    );
});

export default handler;
