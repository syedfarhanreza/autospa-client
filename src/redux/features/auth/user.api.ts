import { api } from "@/redux/api/api";
import { TUser } from "@/types/user";
interface IQueryOptions {
  searchTerm?: string;
  page?: string | number;
  limit?: number | string;
}
const userRelatedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: (payload) => ({
        url: "/user/update",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserImage: builder.mutation<{ data: string }, FormData>({
      query: (file) => ({
        url: `/user/update-profile-image`,
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query<
      { data: TUser[]; totalDoc: number },
      IQueryOptions
    >({
      query: ({ limit, page, searchTerm }) => ({
        url: `/user/all?searchTerm=${searchTerm}&page=${page || "1"}&limit=${
          limit || 10
        }`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});
export const {
  useUpdateUserInfoMutation,
  useUpdateUserImageMutation,
  useGetAllUserQuery,
} = userRelatedApi;
