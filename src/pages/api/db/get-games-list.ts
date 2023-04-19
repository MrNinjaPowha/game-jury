import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../server/database';

export type GamesList = {
  title: string;
  titleSlug: string;
  boxArtImage: string;
};

const GetGamesList: NextApiHandler = async (_, res) => {
  const [data] = await executeQuery('SELECT title, titleSlug, boxArtImage FROM game');
  if (!data) throw 'Result is null';
  res.status(200).json(data);
};

export default GetGamesList;
