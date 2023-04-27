import { getTimeSince } from '@/helpers/datetime';
import { JoinedTableReview } from '@/pages/api/db/get-reviews';
import RatingDisplay from './rating-display';

export default function Review(props: { data: JoinedTableReview }) {
  return (
    <div className="flex-grow basis-80 rounded border border-gray-300  dark:border-slate-700">
      <div
        className="flex items-center rounded-t bg-gray-200 p-2 data-[has-message=true]:rounded dark:bg-slate-800"
        data-has-message={props.data.message ? true : false}
      >
        <RatingDisplay rating={props.data.rating} />
        <div className="flex flex-1 items-center justify-between gap-6 p-4">
          <span className="text-2xl">{props.data.username ?? 'Guest'}</span>
          <span>{getTimeSince(new Date(Date.parse(props.data.postedAt)))}</span>
        </div>
      </div>
      {props.data.message && (
        <p className="max-h-40 overflow-hidden whitespace-pre-wrap p-2 py-4">
          {props.data.message}
        </p>
      )}
    </div>
  );
}
