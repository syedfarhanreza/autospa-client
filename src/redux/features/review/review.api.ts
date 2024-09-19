import { api } from "@/redux/api/api";
const reviewAPi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (post) => ({
        url: "/review/create",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});
export const { useCreateReviewMutation } = reviewAPi;
