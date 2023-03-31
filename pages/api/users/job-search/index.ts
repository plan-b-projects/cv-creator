import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next';
import { addFavJob, findUser } from '../../../../db/db';
import { authOptions } from '../../auth/[...nextauth]';




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const email = session?.user?.email;
    if (req.method === 'POST') {

        const findEmail = await findUser(email!)
        if (findEmail) {
            await addFavJob(email!, req.body.job)
            res.status(200).json('')

        }
        else {
            res.status(401).json('Not authorized')
        }
    }
};



