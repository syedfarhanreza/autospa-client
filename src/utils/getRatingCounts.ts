import { IReview } from "@/types/review";

export const getRatingCounts = (reviews: IReview[]) => {
  const ratingMap: Record<number, number> = {};

  reviews.forEach((review) => {
    const { rating } = review;
    if (ratingMap[rating]) {
      ratingMap[rating] += 1;
    } else {
      ratingMap[rating] = 1;
    }
  });

  const ratingCounts = Object.entries(ratingMap).map(([rating, count]) => ({
    rating: parseInt(rating, 10),
    count,
  }));

  return ratingCounts.sort((a, b) => b.rating - a.rating);
};
