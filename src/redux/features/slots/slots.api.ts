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
  }),
});
export const { useGetSlotsQuery } = slotsApi;
