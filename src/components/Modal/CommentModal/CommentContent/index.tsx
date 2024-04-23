import { CommentContentContainer } from "./CommentContent.styles.ts";
import { useQuery } from "react-query";
import axios from "axios";
import Comment from "./Comment";
import React from "react";
import { CommentType } from "../../../../types/commentType.ts";

interface CommentContentProps {
  id?: string;
}

const fetchComments = () => axios.get("/comments");

const CommentContent: React.FC<CommentContentProps> = ({ id }) => {
  const { isLoading, data, isError } = useQuery(
    "fetch-comments",
    fetchComments,
    {
      select: (data) => {
        return data.data?.postId === Number(id) ? data.data?.comments : [];
      },
    },
  );

  if (isLoading) return <>Loading...</>;
  if (isError) return <>댓글을 불러오지 못했습니다.</>;

  return (
    <CommentContentContainer>
      {data?.map((comment: CommentType) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </CommentContentContainer>
  );
};

export default CommentContent;