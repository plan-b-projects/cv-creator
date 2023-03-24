import { createUser, findUser } from "../../../db/db";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const findEmail = await findUser(req.body.email)
        if (findEmail) {
            res.status(200).json('')

        }
        else {
            const newUser = await createUser({ email: req.body.emails })
            console.log(req.body.email);
            res.status(201).json(newUser)
        }
    }
    else {
        res.status(200).json({ message: 'method not allowed' })
    }
}