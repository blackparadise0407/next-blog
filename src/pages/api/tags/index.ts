import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs, query, where } from '@firebase/firestore';
import db from 'utils/database';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<any>>
) {
    const { method } = req;

    if (method === 'GET') {
        const { q = '' } = req.query;
        try {
            const fireQuery = query(
                collection(db, 'tags'),
                where('name', '>=', q)
            );
            const querySnapshot = await getDocs(fireQuery);
            const data: any[] = [];
            querySnapshot.forEach((res) => {
                data.push({ ...res.data(), uid: res.id });
            });
            return res.send({ data: data as ITag[], message: 'OK' });
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: 'Insufficient permission' });
        }
    }
}
