import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../server/database';
import { TableReview } from '../../../../server/database/tableInterfaces';

const PostReview: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed!' });
    return;
  }

  const data: TableReview = JSON.parse(req.body);
  console.log(data);

  if (data.message) data.message = `"${data.message}"`;

  const sql = `
  INSERT INTO review (gameId, userId, rating, message, postedAt, editedAt)
	  VALUES (${data.gameId}, ${data.userId}, ${data.rating}, ${data.message}, NOW(), NOW())`;
  const [result] = await executeQuery(sql);
  res.status(200).send('Review posted');
};

export default PostReview;
