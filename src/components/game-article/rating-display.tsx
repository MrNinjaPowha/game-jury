function getRatingColor(rating?: number) {
  if (!rating) return { r: 128, g: 128, b: 128 };
  const colorHighestRating = { r: 59, g: 130, b: 246 };
  const colorLowestRating = { r: 220, g: 38, b: 38 };

  const ratingMultiplier = (rating - 1) / 9;

  return {
    r: colorLowestRating.r - (colorLowestRating.r - colorHighestRating.r) * ratingMultiplier,
    g: colorLowestRating.g - (colorLowestRating.g - colorHighestRating.g) * ratingMultiplier,
    b: colorLowestRating.b - (colorLowestRating.b - colorHighestRating.b) * ratingMultiplier,
  };
}

export default function RatingDisplay(props: { rating?: number }) {
  const ratingColor = getRatingColor(props.rating);

  return (
    <div
      style={{ backgroundColor: `rgb(${ratingColor.r}, ${ratingColor.g}, ${ratingColor.b})` }}
      className="flex h-16 w-16 items-center justify-center rounded font-montserrat text-3xl font-bold text-white dark:text-inherit"
    >
      <div>
        {props.rating ?? '-'}
        <span className="text-xs">/10</span>
      </div>
    </div>
  );
}
