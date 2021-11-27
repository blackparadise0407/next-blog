import { getAccessToken } from '@auth0/nextjs-auth0';
import nextConnect from 'next-connect';
import path from 'path';
import { File, IncomingForm } from 'formidable';

import ncOpts from '@/api-lib/ncOpts';
import dbConnect from '@/lib/database';
import { BadRequestException } from '@/shared/exceptions/BadRequest';
import { auth } from '@/shared/middlewares/auth';

const handler = nextConnect(ncOpts);
handler.use(auth);
handler.post(async (req, res) => {
    await dbConnect();
    const form = new IncomingForm({
        uploadDir: path.join(__dirname, '..', '..', 'temp'),
    });
    form.parse(req, (err, fields, files) => {
        const uploadedFile = files.file as File;
        if (!uploadedFile) {
            throw new BadRequestException('No file');
        }
    });
});

handler.get(async (req, res) => {
    throw new BadRequestException('No file');
});

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
};
