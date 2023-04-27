import { ReactNode, useEffect, useState } from 'react';
import { JoinedTableReview } from '@/pages/api/db/get-reviews';
import Review from './review';
import ReviewModal from './review-modal';

export default function ReviewSection(props: { gameId: number; className?: string }) {
  const [reviewsData, setReviewsData] = useState<JoinedTableReview[]>();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  let reviews: ReactNode;

  useEffect(() => {
    fetch('/api/db/get-reviews', {
      method: 'POST',
      body: JSON.stringify(props.gameId),
    })
      .then((res) => res.json())
      .then((res) => {
        setReviewsData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [props.gameId]);

  // while loading
  if (loading)
    reviews = (
      <div className="m-auto max-w-max p-4">
        <div className="loading-spinner"></div>
      </div>
    );
  // on server error
  else if (!reviewsData) reviews = <p>Oops! Something went wrong loading the reviews.</p>;
  // on no database rows returned
  else if (!reviewsData.length) reviews = <p>There are currently no reviews for this game.</p>;
  // on no errors
  else reviews = reviewsData.map((review) => <Review key={review.id} data={review} />);

  return (
    <div className={props.className}>
      <div className="mb-2 flex items-center justify-between rounded border border-gray-300 bg-gray-200 p-4 py-2 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-2xl">Reviews</h3>
        <div>
          <button className="btn-icon rounded-md px-3" onClick={() => setShowModal(true)}>
            Write review
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-4">{reviews}</div>
      <ReviewModal
        visible={showModal}
        title="Write Review"
        onClose={() => setShowModal(false)}
        gameId={props.gameId}
      />
    </div>
  );
}
