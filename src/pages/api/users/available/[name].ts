import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../../server/database';
import { TableUser } from '../../../../../server/database/tableInterfaces';

const UsernameAvailable: NextApiHandler = async (req, res) => {
  const { name } = req.query;
  const [data] = await executeQuery(`SELECT id FROM user WHERE username = "${name}"`);
  if (!data) throw 'Query response is null';

  const user = data as TableUser[];

  let available = true;

  if (user.length) {
    available = false;
  }

  res.status(200).json({ available });
};

export default UsernameAvailable;
