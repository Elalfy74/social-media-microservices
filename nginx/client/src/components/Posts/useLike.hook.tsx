import { useQueryClient } from '@tanstack/react-query';
import { removeLike, createLike } from '@/services/likes.service';
import { type Post } from '@/types/posts.types';

type UseLikeProps = {
  userHasLiked: boolean;
  postId: string;
};

export const useLike = ({ userHasLiked, postId }: UseLikeProps) => {
  const queryClient = useQueryClient();

  async function handleLike() {
    if (userHasLiked) {
      await removeLike({ postId });
    } else {
      await createLike({ postId });
    }
    queryClient.setQueryData(['posts'], (data?: Post[]) => {
      if (!data) return;

      const targetPostIndex = data.findIndex((post) => post.id === postId);

      if (targetPostIndex !== -1) {
        const newData = [...data];
        const target = newData[targetPostIndex];

        newData[targetPostIndex] = {
          ...target,
          userHasLiked: !userHasLiked,
          likesCount: userHasLiked ? target.likesCount - 1 : target.likesCount + 1,
        };

        return newData;
      }
    });
  }

  return handleLike;
};
