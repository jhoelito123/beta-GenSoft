import IconStar from '../icons/star';

type RatingProps = {
  rating: number; // por ejemplo: 3.5, 4, etc.
};

export function StarRating({ rating }: RatingProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <IconStar key={star} filled={rating >= star} />
      ))}
    </div>
  );
}
