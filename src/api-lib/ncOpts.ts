import { NextApiRequest, NextApiResponse } from 'next';
import chalk from 'chalk';
import { Options } from 'next-connect';
import { BadRequestException } from '@/shared/exceptions/BadRequest';

const ncOpts: Options<NextApiRequest, NextApiResponse> = {
    onError: (err, _, res) => {
        let statusCode: number = 400;
        let message = '';
        if (err instanceof BadRequestException) {
            statusCode = err.statusCode;
        }
        console.error(
            chalk.bgRed.whiteBright('===================================')
        );
        console.error(err.stack);
        message = err?.message || 'Something broke!';
        res.status(statusCode).json({ message, statusCode });
    },
    onNoMatch: (_, res) => {
        res.status(404).end('Page is not found');
    },
};

export default ncOpts;
