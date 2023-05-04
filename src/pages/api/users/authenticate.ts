import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../server/database';
import { TableUser } from '../../../../server/database/tableInterfaces';
import { User } from '@/helpers/account/user-validation';
import { compare } from 'bcrypt';

const Authenticate: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed!' });
    return;
  }

  const { username, password }: Omit<User, 'birthdate'> = JSON.parse(req.body);
  const [data] = await executeQuery(`SELECT * FROM user WHERE username = "${username}"`);
  if (!data) throw 'Unknown error contacting database';

  const [user]: TableUser[] = JSON.parse(JSON.stringify(data));
  const authenticated = user ? await compare(password, user.password) : false;

  res.status(200).json(authenticated);
};

export default Authenticate;
