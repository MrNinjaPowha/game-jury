import { User } from '@/helpers/account/user-validation';
import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../server/database';
import { formatDate } from '@/helpers/datetime';
import { hash } from 'bcrypt';

type RequestBody = Omit<User, 'birthdate'> & {
  birthdate: string;
};

const RegisterUser: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed!' });
    return;
  }

  const user: RequestBody = JSON.parse(req.body);
  const passwordHash = await hash(user.password, 10);

  const sql = `
  INSERT INTO user (username, password, birthdate, createdAt)
    VALUES (
      "${user.username}", 
      "${passwordHash}", 
      "${formatDate(new Date(user.birthdate))}", 
      NOW()
    )`;

  const [result] = await executeQuery(sql);
  if (!result) throw 'Unknown error contacting database';
  res.status(200).send({ message: 'User registered' });
};

export default RegisterUser;
