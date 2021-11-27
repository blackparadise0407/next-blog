import { BadRequestException } from '@/shared/exceptions/BadRequest';
import { v2 } from 'cloudinary';

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const uploadSingle = async (path: string, type: ImageType) => {
    try {
        const resp = await v2.uploader.upload(path, {
            folder: `Prism/${type}`,
            upload_preset: 'ml_default',
        });
        return resp;
    } catch (e: any) {
        throw new BadRequestException(e?.message);
    }
};

const cloudUpload = v2;

export default cloudUpload;
