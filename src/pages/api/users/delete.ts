import { verifyToken } from '@/helpers/account/webToken';
import { NextApiHandler } from 'next';
import { UserTokenObject } from './authenticate';
import { executeQuery } from '../../../../server/database';

const DeleteUser: NextApiHandler = async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(405).send({ message: 'Only DELETE requests allowed!' });
    return;
  }

  const token = JSON.parse(req.body);

  if (typeof token !== 'string') {
    res.status(400).send({ message: 'Body needs to be a string.' });
    return;
  }

  const tokenObject = verifyToken(token.split(' ')[1]);

  const user = tokenObject as UserTokenObject;

  let error: boolean | undefined;
  if (user?.id) {
    const sql = [
      `DELETE FROM comment WHERE userId = ${user.id}`,
      `DELETE FROM review WHERE userId = ${user.id}`,
      `DELETE FROM user WHERE id = ${user.id}`,
    ];

    for (const query of sql) {
      const [result] = await executeQuery(query);

      if (!result) {
        error = true;
        break;
      }
    }
  }

  if (!error) {
    res.status(200).send({ message: 'User deleted.' });
  } else {
    res.status(500).send({ message: 'Something went wrong when trying to delete the user.' });
  }
};

export default DeleteUser;
