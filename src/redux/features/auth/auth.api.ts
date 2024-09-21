import { api } from "@/redux/api/api";
import { TRole, TUser } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create blog post
    registerCustomer: builder.mutation({
      query: (post) => ({
        url: "/auth/register/customer",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    loginUser: builder.mutation({
      query: (post: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["user"],
    }),
    changeRole: builder.mutation({
      query: (post: { id: string; role: TRole }) => ({
        url: `/auth/update-role/${post.id}`,
        method: "PUT",
        body: { role: post.role },
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (payload: { oldPassword: string; password: string }) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    getAuthor: builder.query<{ data: TUser }, string>({
      query: (token) => {
        return {
          url: `/auth/auth-state`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});
export const {
  useRegisterCustomerMutation,
  useLoginUserMutation,
  useGetAuthorQuery,
  useResetPasswordMutation,
  useChangeRoleMutation,
} = userApi;
