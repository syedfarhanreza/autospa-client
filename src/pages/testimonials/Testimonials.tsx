import { StarRating } from "@/components/home/Reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import SectionHeading from "@/components/ui/sectionHeading";
import { useGetReviewsQuery } from "@/redux/features/review/review.api";
import { format } from "date-fns";
import { useState } from "react";

const Testimonials = () => {
  const [page, setpage] = useState(1);

  const { data } = useGetReviewsQuery({ limit: 10, page });

  return (
    <div className="layout_container py-[30px] min-h-screen">
      <div className="w-full h-[300px] md:h-[500px] bg-red-100 testimonial_bg rounded-[18px] center flex flex-col gap-[20px]">
        <SectionHeading
          description=""
          heading="Testimonials From Our Clients"
          slogan="Happy Clients"
        />
      </div>
      <div className="mx-auto mt-[30px] flex flex-col gap-[12px]">
        {data?.data?.map(({ _id, comment, rating, createdAt, user }) => {
          const date = format(
            new Date(createdAt || "11--11-202"),
            "MMM dd yyyy"
          );

          return (
            <Card className="py-[8px] w-full" key={_id}>
              <CardContent className="w-full">
                <div className="flex justify-between items-start gap-[5px] w-full">
                  <div className="flex items-start justify-start gap-[10px]">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>{" "}
                    <div>
                      <p className="font-[700]">{user?.firstName}</p>
                      <p className="font-medium text-[12px]">{date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <StarRating rating={rating} />
                  </div>
                </div>

                <p className="text-white mt-[15px]">{comment}</p>
              </CardContent>
            </Card>
          );
        })}

        <div className="w-full flex items-center justify-start gap-[10px] mt-6">
          <p>Page:</p>
          <Pagination className="w-fit mx-0">
            <PaginationContent>
              {Array.from({
                length: Math.ceil((data?.totalDoc || 0) / 10),
              }).map((_, i) => (
                <PaginationItem key={i + "page"}>
                  <PaginationLink
                    onClick={() => setpage(i + 1)}
                    className={`${
                      page === i + 1
                        ? "bg-primary text-muted hover:bg-primary"
                        : "text-primary"
                    } border-[1px] border-primary`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
