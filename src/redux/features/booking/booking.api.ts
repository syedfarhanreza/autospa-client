import { api } from "@/redux/api/api";
import { IBooking, IUserBooking } from "@/types/booking";
interface IQueryOptions {
  filter?: string;
  page?: string | number;
  limit?: number | string;
}
const slotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<{ data: any; success: boolean }, IBooking>({
      query: (payload: IBooking) => {
        return {
          url: `/bookings`,
          body: payload,
          method: "POST",
        };
      },
      invalidatesTags: ["booking"],
    }),
    getAllBookings: builder.query<
      { data: IUserBooking[]; totalDoc: number },
      IQueryOptions
    >({
      query: ({ limit, page }) => {
        return {
          url: `/bookings?page=${page || "1"}&limit=${limit || 10}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    getUserAllBookings: builder.query<
      { data: IUserBooking[]; totalDoc: number },
      { filter: string }
    >({
      query: ({ filter }) => {
        return {
          url: `/my-bookings?${filter}`,
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
  }),
});
export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserAllBookingsQuery,
} = slotsApi;
