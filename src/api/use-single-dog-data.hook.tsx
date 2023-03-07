import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../core/api';
import { GetSingleDogDto } from './dto/get-single-dog.dto';

interface GetSingleDogParams {
  id: string;
}

const getSingleDog = async ({ id }: GetSingleDogParams) => {
  const { data } = await api.get<GetSingleDogDto>(`https://api.thedogapi.com/v1/images/${id}`);

  return data;
}

interface useSingleDogDataParams {
  id: string | null;
}

export const useSingleDogData = ({ id }: useSingleDogDataParams) => {
  const { data, isLoading, isError, refetch } = useQuery('getSingleDog-${id}',
    () => getSingleDog({ id: id || ''}),
    {
      enabled: false
    },
  );

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id])

  return {
    data,
    isLoading,
    isError
  }
}