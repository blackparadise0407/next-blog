import nextConnect from 'next-connect';
import { File, IncomingForm } from 'formidable';

import ncOpts from '@/api-lib/ncOpts';
import dbConnect from '@/lib/database';
import { BadRequestException } from '@/shared/exceptions/BadRequest';
import { auth } from '@/shared/middlewares/auth';
import { uploadSingle } from '@/lib/cloudinary';
import { AdvancedResponse } from '@/shared/AdvancedResponse';

const handler = nextConnect(ncOpts);

handler.use(auth);
handler.post(async (req, res) => {
    await dbConnect();
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const uploadedFile = files.file as File;
        const type = fields.type as ImageType;
        if (err) {
            const error = new BadRequestException(String(err));
            res.status(error.statusCode).send(error);
        }
        if (!type) {
            const error = new BadRequestException('Type is required');
            res.status(error.statusCode).send(error);
        }
        if (!uploadedFile) {
            const error = new BadRequestException('No files found');
            res.status(error.statusCode).send(error);
        }
        const { secure_url } = await uploadSingle(uploadedFile.filepath, type);
        const resp = new AdvancedResponse({ data: secure_url });
        res.send(resp);
    });
    return;
});

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
};
