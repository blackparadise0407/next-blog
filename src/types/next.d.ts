import { Claims, Session } from '@auth0/nextjs-auth0';
import { IncomingMessage } from 'http';
declare module 'next' {
    export interface NextApiRequest extends IncomingMessage {
        session: Session;
        user: Claims;
    }
}
