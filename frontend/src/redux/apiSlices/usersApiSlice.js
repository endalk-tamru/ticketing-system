import { apiSlice } from "./apiSlice";
import { API_TAGS } from "../../constants/apiTags";

const AUTH_URL = "/auth";
const USERS_URL = "/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.TICKET],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.TICKET],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data?._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [API_TAGS.USER, API_TAGS.TICKET],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.USER],
    }),
    getUsers: builder.query({
      query: () => `${USERS_URL}`,
      providesTags: [API_TAGS.USER],
    }),
    getUserById: builder.query({
      query: () => `${USERS_URL}/${userId}`,
      invalidatesTags: [API_TAGS.USER],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
} = usersApiSlice;
