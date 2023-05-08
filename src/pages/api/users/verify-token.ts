import { verifyToken } from '@/helpers/account/webToken';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiHandler } from 'next';

export type VerifyTokenResponse = {
  success: boolean;
  userToken?: string | JwtPayload;
};

const VerifyToken: NextApiHandler = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed!' });
    return;
  }

  const token = JSON.parse(req.body);

  if (typeof token !== 'string') {
    res.status(400).send({ message: 'Body needs to be a string.' });
    return;
  }

  const userToken = verifyToken(token.split(' ')[1]);

  if (userToken) {
    res.status(200).json({ success: true, userToken });
  } else {
    res.status(500).json({ success: false });
  }
};

export default VerifyToken;
