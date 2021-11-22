import { NextApiRequest, NextApiResponse } from 'next';
import { Options } from 'next-connect';

const ncOpts: Options<NextApiRequest, NextApiResponse> = {
    onError: (err, _, res) => {
        console.error(err.stack);
        res.status(500).end('Something broke!');
    },
    onNoMatch: (_, res) => {
        res.status(404).end('Page is not found');
    },
};

export default ncOpts;
