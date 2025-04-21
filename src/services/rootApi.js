import { logOut } from "@redux/slices/authSlice";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Token", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithForceLogout = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
    // await peristor.purge();
    window.location.href = "/login";
  }

  return result;
};

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithForceLogout,
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ name, email, password }) => {
          return {
            url: "/user/register",
            body: { name, email, password },
            method: "POST",
          };
        },
      }),
      login: builder.mutation({
        query: ({ email, password }) => {
          return {
            url: "/user/login",
            body: { email, password },
            method: "POST",
          };
        },
      }),
      verifyOTP: builder.mutation({
        query: ({ activationToken, otp }) => {
          return {
            url: "/user/verify",
            body: { activationToken, otp },
            method: "POST",
          };
        },
      }),
      getAuthUser: builder.query({
        query: () => "/user/me",
        providesTags: ["Role"],
      }),
      getAllCourses: builder.query({
        query: () => "/course/all",
        providesTags: ["Courses"],
      }),

      fetchCourse: builder.query({
        query: (id) => `/course/${id}`,
      }),
      checkoutPayment: builder.mutation({
        query: () => ({
          url: "/create-payment-link",
          method: "POST",
        }),
      }),
      receiveHook: builder.mutation({
        query: () => ({
          url: "receive-hook",
          method: "POST",
        }),
      }),
      courseCheckout: builder.mutation({
        query: (id) => ({
          url: `/verification/${id}`,

          method: "POST",
        }),
      }),
      getMyCourses: builder.query({
        query: () => "/mycourse",
      }),
      getDetailCourse: builder.query({
        query: (id) => `/course/${id}`,
      }),
      getDetailLectures: builder.query({
        query: (id) => `/lectures/${id}`,
        providesTags: ["Lectures"],
      }),
      getDetailLecture: builder.query({
        query: (id) => `/lecture/${id}`,
      }),
      deleteCourse: builder.mutation({
        query: (id) => ({
          url: `/course/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Courses"],
      }),
      addLecture: builder.mutation({
        query: ({ id, formData }) => {
          return { url: `/course/${id}`, method: "POST", body: formData };
        },
        invalidatesTags: ["Lectures"],
      }),
      deleteLecture: builder.mutation({
        query: (id) => ({
          url: `/lecture/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Lectures"],
      }),
      fetchStats: builder.query({
        query: () => "/stats",
      }),
      addCourse: builder.mutation({
        query: (formCourse) => ({
          url: "/course/new",
          method: "POST",
          body: formCourse,
        }),
        invalidatesTags: ["Courses"],
      }),
      fetchUsers: builder.query({
        query: () => "/users",
        providesTags: ["Role"],
      }),
      updateRole: builder.mutation({
        query: (id) => ({
          url: `/user/${id}`,
          method: "PUT",
        }),
        invalidatesTags: ["Role"],
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useGetAuthUserQuery,
  useGetAllCoursesQuery,
  useFetchCourseQuery,
  useCheckoutPaymentMutation,
  useReceiveHookMutation,
  useCourseCheckoutMutation,
  useGetMyCoursesQuery,
  useGetDetailCourseQuery,
  useGetDetailLecturesQuery,
  useGetDetailLectureQuery,
  useDeleteCourseMutation,
  useAddLectureMutation,
  useDeleteLectureMutation,
  useFetchStatsQuery,
  useAddCourseMutation,
  useFetchUsersQuery,
  useUpdateRoleMutation,
} = rootApi;
