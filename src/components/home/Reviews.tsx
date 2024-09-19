import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from "@/redux/features/review/review.api";
import { useAppSelector } from "@/redux/hooks";
import { IReview } from "@/types/review";
import { getRatingCounts } from "@/utils/getRetingCount";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { FormEvent, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { MdArrowRight } from "react-icons/md";
import Rating from "react-rating";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
const RatingBar = ({ data }: { data: IReview[] }) => {
  const review = getRatingCounts(data);
  return (
    <>
      {review.map(({ count, rating }) => (
        <div className="flex items-center gap-2">
          <div className="w-8 text-sm font-medium">{rating}.0</div>
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primaryMat"
              style={{ width: `${(count / review.length) * 100}%` }}
            />
          </div>
          <div className="w-20 text-sm text-muted-foreground">
            {count} reviews
          </div>
        </div>
      ))}
    </>
  );
};

export const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating ? "text-primaryMat fill-primaryMat" : "text-primaryMat"
        }`}
      />
    ))}
  </div>
);

const Review = ({
  name,
  rating,
  date,
  comment,
}: {
  name: string;
  rating: number;
  date: string;
  comment: string;
}) => {
  const dateTime = formatDistanceToNow(new Date(date || "11-11-2020"), {
    addSuffix: true,
  });
  return (
    <div className="py-6 border-t border-border">
      <div className="flex items-center gap-4 mb-2">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
          />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{dateTime}</div>
        </div>
        <div className="ml-auto flex items-center">
          <StarRating rating={rating} />
          <span className="ml-2 font-semibold">{rating}.0</span>
        </div>
      </div>
      <p className="mb-4">{comment}</p>
    </div>
  );
};

export default function Component() {
  const [review, setReview] = useState<number>(1);
  const { data } = useGetReviewsQuery({ limit: 99999 });
  const { user } = useAppSelector((state) => state.auth);

  const [createReview] = useCreateReviewMutation();

  const handleRating = (rate: number) => setReview(rate);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return navigate("/login");
    }

    const toastID = toast.loading("Please wait...");
    try {
      const form = e.target as HTMLFormElement;
      const comment = form.feedback.value as string;
      if (!comment || comment.length < 15) {
        return toast.error("review should be at least 15 character");
      }
      await createReview({
        rating: review,
        comment,
      });
      toast.dismiss(toastID);
      toast.success("Review added", {
        description: "Thanks for your feedback",
      });
      form.reset();
    } catch {
      toast.error("something went wrong while making this request");
    }
  };

  const RatingJsx = Rating as any;

  const rating = data?.data?.reduce((acc, cur) => acc + cur.rating, 0) || 0;
  const totalCount = data?.data?.length || 1;

  const avgRating = (rating / totalCount).toFixed(2);
  return (
    <section
      className="layout_container py-[40px] flex md:flex-row flex-col gap-[20px]"
      id="review"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-8 mb-8">
            <h2 className="text-5xl font-bold">{avgRating}</h2>
            <div className="flex-1">
              <RatingBar data={data?.data || []} />
            </div>
          </div>

          {data?.data?.slice(0, 2)?.map((review, i) => (
            <Review
              key={i + "rev"}
              name={`${review.user?.firstName} ${review.user.lastName}`}
              rating={review.rating}
              date={review.createdAt}
              comment={review.comment}
            />
          ))}
          <Link
            to={"/testimonials"}
            className="mt-4 mx-auto text-primary text-center hover:underline center gap-[5px]"
          >
            Read all reviews <MdArrowRight />
          </Link>
        </CardContent>
      </Card>
      <div className="bg-muted px-6 py-8 sm:px-10 sm:py-10 md:w-[40%] w-full">
        <h3 className="text-xl font-bold mb-4">Write a Review</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <RatingJsx
            className="text-[30px]"
            emptySymbol={<GoStar className="text-primaryMat" />}
            fullSymbol={<GoStarFill className="text-primaryMat" />}
            onClick={handleRating}
          />
          <div>
            <Label htmlFor="feedback" className="mb-2">
              Feedback:
            </Label>
            <Textarea
              placeholder="Share your thoughts and experiences..."
              className="w-full rounded-lg border-2 border-muted focus:border-primary focus:ring-primary"
              rows={4}
              name="feedback"
            />
          </div>
          <Button type="submit" className="justify-self-end bg-primaryMat">
            Submit Review
          </Button>
        </form>
      </div>
    </section>
  );
}
