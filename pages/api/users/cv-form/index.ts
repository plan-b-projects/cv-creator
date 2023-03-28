import type { NextApiRequest, NextApiResponse } from 'next';
import { findUser, updateCvForm, saveTemplateToCv } from '../../../../db/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;
  if (!email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await findUser(email);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    await updateCvForm(user.email, req.body);
    return res.status(201).json({ message: 'Updated' });
  }

  if (req.method === 'PATCH') {
    await saveTemplateToCv(user.email, req.body);
    return res.status(201).json({ message: 'Updated' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(user.cv || {});
  }

  return res.status(400).json({ message: 'Method not implemented' });
}
