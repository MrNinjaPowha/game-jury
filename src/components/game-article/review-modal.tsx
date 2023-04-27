import { useRef, useState } from 'react';
import Modal, { ModalProps } from '../modal';
import RatingSelector from './rating-selector';

export default function ReviewModal(props: ModalProps & { gameId: number }) {
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function onClose() {
    setError(null);
    setRating(null);
    setSubmitting(false);
    props.onClose();
  }

  function onSubmit() {
    if (!messageRef) {
      setError('Something went wrong. Please try again later!');
      return;
    }
    if (!rating) {
      setError('You need to set a rating before submitting!');
      return;
    }

    setSubmitting(true);
    fetch('/api/db/post-review', {
      method: 'POST',
      body: JSON.stringify({
        gameId: props.gameId,
        rating,
        userId: null,
        message: messageRef.current?.value || null,
      }),
    })
      .then(() => {
        setSubmitting(false);
        onClose();
      })
      .catch((err) => {
        setSubmitting(false);
        console.error(err);
      });
    console.log(messageRef.current?.value, rating);
  }

  return (
    <Modal visible={props.visible} title={props.title} onClose={onClose}>
      <div className="flex items-start gap-2 p-2">
        <RatingSelector setRating={setRating} />
        <textarea
          className="max-h-80 w-[32rem] min-w-0 flex-1 resize-none rounded border border-gray-300 p-2 py-1 shadow-inner dark:border-slate-600 dark:bg-slate-800"
          ref={messageRef}
        ></textarea>
      </div>
      {error && <p>{error}</p>}
      <div className="ml-auto flex max-w-max gap-2">
        <button className="btn btn-blue" onClick={onSubmit}>
          {submitting && (
            <div className="dark m-auto h-6 w-6">
              <div className="loading-spinner"></div>
            </div>
          )}
          <div className="overflow-hidden data-[submitting=true]:h-0" data-submitting={submitting}>
            Submit
          </div>
        </button>
        <button className="btn btn-default" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
