import { api } from "@/redux/api/api";
import { IService } from "@/types/service";
interface IQueryOptions {
  searchTerm?: string;
  min?: number;
  max?: number;
  sort?: string;
  page?: string | number;
  limit?: number | string;
}
const serviceAPi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<
      { data: IService[]; totalDoc: number },
      IQueryOptions
    >({
      query: (query) => {
        const {
          max = "",
          min = "",
          searchTerm = "",
          sort = "",
          page,
          limit,
        } = query;
        return {
          url: `/services?searchTerm=${searchTerm}&min=${min}&max=${max}&sort=${sort}&page=${
            page || "1"
          }&limit=${limit || 10}`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),
    getServiceNames: builder.query<
      { data: { name: string; _id: string }[] },
      undefined
    >({
      query: () => {
        return {
          url: `/services/g/names`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),
    getServiceById: builder.query<{ data: IService }, string>({
      query: (id: string) => {
        return {
          url: `/services/${id}`,
          method: "GET",
        };
      },
      providesTags: ["service"],
    }),
    createService: builder.mutation<
      { data: IService; success: boolean },
      object
    >({
      query: (data) => {
        return {
          url: `/services`,
          method: "POST",
          body: { ...data, isDeleted: false },
        };
      },
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id: string) => {
        return {
          url: `/services/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: ({ id, payload }: { id: string; payload: Partial<IService> }) => {
        return {
          url: `/services/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["service"],
    }),
  }),
});
export const {
  useGetServicesQuery,
  useGetServiceNamesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceAPi;
