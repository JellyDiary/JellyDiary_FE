import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryClient } from "../react-query/queryClient.ts";
import { queryKeys } from "../react-query/constants.ts";

export const useFetchUserFeed = (userId: string) =>
  useQuery({
    queryKey: [queryKeys.userFeed, userId],
    queryFn: () => api.get(`/api/feed/userInfo/${userId}`),
    select: (data) => data.data?.data,
    staleTime: 600000,
  });

export const useFetchUserFeedPost = (userId: string) =>
  useQuery({
    queryKey: [queryKeys.userFeedPost, userId],
    queryFn: () => api.get(`/api/feed/feedList/${userId}`),
    select: (r) => r.data.data,
  });

export const useFollowMutation = (
  userId: number,
  userFeed?: string,
  title?: string,
) => {
  const changeFollowStatus = (status: boolean) => {
    if (!status) {
      return api.post(`/api/feed/follow/${userId}`);
    } else {
      return api.delete(`/api/feed/follow/${userId}`);
    }
  };

  const { mutate } = useMutation({
    mutationFn: changeFollowStatus,
    onSuccess: () => {
      if (title === "팔로워") {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.followerList, String(userFeed), title],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.userFeed, String(userFeed)],
        });
      } else if (title === "팔로우") {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.followerList, String(String(userFeed)), title],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.userFeed, String(userFeed)],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.userFeed, String(userId)],
        });
      }
    },
  });

  return { mutate };
};

export const useFetchFollowerList = (id: string, title: string) =>
  useQuery({
    queryKey: [queryKeys.followerList, id, title],
    queryFn: () => {
      if (title === "팔로워") {
        return api.get(`/api/feed/followerList/${id}`);
      } else {
        return api.get(`/api/feed/followList/${id}`);
      }
    },
    select: (data) => data.data.data,
  });
