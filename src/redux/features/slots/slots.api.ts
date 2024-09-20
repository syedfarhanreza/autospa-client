import { api } from "@/redux/api/api";
import { ISlot } from "@/types/slot";
interface IQueryOptions {
  serviceId?: string;
  date?: string;
}
const slotsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query<{ data: ISlot[] }, IQueryOptions>({
      query: (query: IQueryOptions) => {
        const { date, serviceId } = query;
        return {
          url: `/slots/availability?service=${serviceId || ""}&date=${
            date || ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),
    getSlotById: builder.query<{ data: ISlot }, string>({
      query: (id) => {
        return {
          url: `/slots/availability/${id}`,
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),
    createSlot: builder.mutation<
      { data: ISlot; success: boolean },
      Partial<ISlot>
    >({
      query: (payload) => {
        return {
          url: `/services/slots`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["slots"],
    }),

    getAllSlots: builder.query<
      { data: ISlot[]; totalDoc: number },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => {
        return {
          url: `/services/get/all?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["slots"],
    }),
    toggleSlotStatus: builder.mutation<{ data: ISlot }, string>({
      query: (id) => {
        return {
          url: `/slots/toggle-status/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useGetAllSlotsQuery,
  useGetSlotByIdQuery,
  useGetSlotsQuery,
  useCreateSlotMutation,
  useToggleSlotStatusMutation,
} = slotsApi;
