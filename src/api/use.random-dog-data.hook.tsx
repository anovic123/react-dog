import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { api } from '../core/api';
import { GetRandomDogsDto } from './dto/get-random-cats.dto';

interface GetRandomDogsParams {
  pageParam: number;
  breedId?: string | null;
}

const getRandomDogs = async ({ pageParam = 0, breedId }: GetRandomDogsParams) => {
  const { data } = await api.get<GetRandomDogsDto>('https://api.thedogapi.com/v1/images/search', {
    params: {
      limit: 10,
      pageParam,
      breed_ids: breedId,
    },
  });

  return data;
};

interface UseRandomDogDataParams {
  breedId?: string | null;
}

export const useRandomDogsData = ({ breedId }: UseRandomDogDataParams = {}) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    `getRandomDogs-${breedId || 'random'}`,
    ({ pageParam }) => getRandomDogs({ pageParam, breedId }),
    {
      getNextPageParam: () => Date.now(),
    },
  );

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  };
};
