import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../core/api';
import { GetFavoriteDto } from './dto/get-favorite.dto';
import { LikeDogDto } from './dto/like-dog.dto';

interface CreateFavoriteParams {
  imageId: string;
}

const createFavorite = async ({ imageId }: CreateFavoriteParams) => {
  const { data } = await api.post<LikeDogDto>('https://api.thedogapi.com/v1/favourites', {
    image_id: imageId,
    sub_id: 'anovic123',
  });

  return data;
};

interface DeleteFavoriteParams {
  favoriteId: number;
}

const deleteFavorite = async ({ favoriteId }: DeleteFavoriteParams) => {
  const { data } = await api.delete(`https://api.thedogapi.com/v1/favourites/${favoriteId}`);

  return data;
};

interface GetSingleFavoriteParams {
  imageId: string;
}

const getSingleFavorite = async ({ imageId }: GetSingleFavoriteParams) => {
  const { data } = await api.get<GetFavoriteDto>('https://api.thedogapi.com/v1/favourites', {
    params: {
      image_id: imageId,
      sub_id: 'anovic123',
    },
  });

  return data;
};

interface UseLikeApiParams {
  dogId: string | null;
}

export const useLikeApi = ({ dogId }: UseLikeApiParams) => {
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [isSingleFavoriteLoading, setIsSingleFavoriteLoading] = useState(false);
  const client = useQueryClient();

  useEffect(() => {
    setFavoriteId(null);

    const fetchSingleFavorite = async () => {
      if (!dogId) {
        return;
      }

      setIsSingleFavoriteLoading(true);

      try {
        const data = await client.fetchQuery({
          queryKey: `single-fav-${dogId}`,
          queryFn: () => getSingleFavorite({ imageId: dogId }),
        });

        setFavoriteId(data[0].id);
      } catch (e) {
        //
      } finally {
        setIsSingleFavoriteLoading(false);
      }
    };

    fetchSingleFavorite();
  }, [dogId]);

  const likeMutation = useMutation(createFavorite);

  const like = async () => {
    if (!dogId) {
      return;
    }

    const { id } = await likeMutation.mutateAsync({ imageId: dogId });
    setFavoriteId(id);
  };

  const deleteMutation = useMutation(deleteFavorite);

  const dislike = async () => {
    if (!dogId || favoriteId === null) {
      return;
    }

    await deleteMutation.mutateAsync({ favoriteId });

    setFavoriteId(null);
  };

  const isLiked = favoriteId !== null;

  const isLoading = likeMutation.isLoading || deleteMutation.isLoading || isSingleFavoriteLoading;

  return { like, dislike, isLiked, isLoading };
};
