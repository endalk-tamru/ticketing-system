import { apiSlice } from "./apiSlice";
import { API_TAGS } from "../../constants/apiTags";

const TICKET_URL = "/tickets";

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (data) => ({
        url: `${TICKET_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.TICKET],
    }),
    updateTicket: builder.mutation({
      query: (data) => ({
        url: `${TICKET_URL}/${data?._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.TICKET],
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `${TICKET_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.TICKET],
    }),
    getTickets: builder.query({
      query: () => `${TICKET_URL}`,
      providesTags: [API_TAGS.TICKET],
    }),
    getTicketById: builder.query({
      query: () => `${TICKET_URL}/${userId}`,
      invalidatesTags: [API_TAGS.TICKET],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
} = ticketsApiSlice;
