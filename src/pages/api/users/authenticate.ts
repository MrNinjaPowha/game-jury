import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../server/database';
import { TableUser } from '../../../../server/database/tableInterfaces';
import { User } from '@/helpers/account/user-validation';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const JWTKey = process.env.JWTKey;

export type AuthenticateResponse = {
  success: boolean;
  error?: string;
  token?: string;
};

export type UserTokenObject = Omit<TableUser, 'password'>;

const Authenticate: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed!' });
    return;
  }

  const user: Omit<User, 'birthdate'> = JSON.parse(req.body);
  const [data] = await executeQuery(`SELECT * FROM user WHERE username = "${user.username}"`);
  if (!data) throw 'Unknown error contacting database';

  const [tableUser]: TableUser[] = JSON.parse(JSON.stringify(data));
  const authenticated = tableUser ? await compare(user.password, tableUser.password) : false;
  if (!authenticated) {
    res.status(400).json({ success: false, error: 'username or password incorrect' });
    return;
  }

  if (!JWTKey) throw 'Could not access JWT secret';

  const { password, ...userToken } = tableUser;

  const token = sign(userToken, JWTKey, { expiresIn: '1y' });

  if (token) {
    res.status(200).json({ success: true, token: `Bearer ${token}` });
  } else {
    res.status(500).json({ success: false, error: 'something went wrong, please try again later' });
  }
};

export default Authenticate;
