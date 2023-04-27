import { NextApiHandler } from 'next';
import { executeQuery } from '../../../../server/database';
import { TableReview } from '../../../../server/database/tableInterfaces';

export type JoinedTableReview = TableReview & {
  username: string | null;
  replies: number | null;
};

const GetReviews: NextApiHandler = async (req, res) => {
  const sql = `
  SELECT R.*, user.username, COUNT(comment.id) AS replies
    FROM (
      SELECT * FROM review 
        WHERE review.gameId = ${req.body}
    ) R
    LEFT JOIN user
      ON user.id = R.userId
    LEFT JOIN comment
      ON comment.reviewId = R.id
    GROUP BY R.id`;
  const [data] = await executeQuery(sql);
  if (!data) throw 'Result is null';
  res.status(200).json(data);
};

export default GetReviews;
