import { getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { UnauthorizedException } from '../exceptions/Unauthorized';

export const auth = (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const session = getSession(req, res);
    if (session) {
        req.session = session;
        req.user = session?.user && session.user;
        next();
    } else throw new UnauthorizedException();
};
