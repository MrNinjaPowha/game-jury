import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../../server/database';

const UsernameAvailable: NextApiHandler = async (req, res) => {
  const { name } = req.query;
  const [data] = await executeQuery(`SELECT id FROM user WHERE username = "${name}"`);
  if (!data) throw 'Query response is null';
  res.status(200).json(data);
};

export default UsernameAvailable;
