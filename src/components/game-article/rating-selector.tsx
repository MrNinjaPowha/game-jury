import { KeyboardEvent, useState } from 'react';
import RatingDisplay from './rating-display';

export default function RatingSelector(props: { setRating: (rating: number) => void }) {
  const [rating, setLocalRating] = useState<number>();
  const [focused, setFocused] = useState(false);

  function handleKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowUp') increaseRating();
    if (event.key === 'ArrowDown') decreaseRating();
    event.preventDefault();
  }

  function setRating(rating: number) {
    setLocalRating(rating);
    props.setRating(rating);
  }

  function increaseRating() {
    if (!rating) setRating(1);
    else setRating(rating + 1 <= 10 ? rating + 1 : rating);
  }

  function decreaseRating() {
    if (!rating) setRating(1);
    else setRating(rating - 1 >= 1 ? rating - 1 : rating);
  }

  return (
    <div
      className="relative inline-block max-h-min"
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <RatingDisplay rating={rating} />
      <div
        className="absolute inset-x-0 top-0 h-1/4 rounded-t bg-black bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 data-[visible=false]:hidden"
        onClick={increaseRating}
        data-visible={focused}
      ></div>
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 rounded-b bg-black bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 data-[visible=false]:hidden"
        onClick={decreaseRating}
        data-visible={focused}
      ></div>
    </div>
  );
}
