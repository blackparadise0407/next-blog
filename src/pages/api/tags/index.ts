import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from '@firebase/firestore';
import db from 'utils/database';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<any>>
) {
    const { method } = req;

    if (method === 'GET') {
        try {
            const querySnapshot = await getDocs(collection(db, 'tags'));
            const data: any[] = [];
            querySnapshot.forEach((res) => {
                data.push({ ...res.data(), uid: res.id });
            });
            return res.send({ data: data as ITag[], message: 'OK' });
        } catch (e) {
            return res.status(403).json({ message: 'Insufficient permission' });
        }
    }
}
