import { FC } from 'react';
import { useBreedData } from '../api/use-breed-data';
import { Button } from '../components/button';
import { useSearchParams } from 'react-router-dom';

interface BreedPageProps {}

export const BreedPage: FC<BreedPageProps> = ({}) => {
  const { data, isLoading } = useBreedData();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBreedButton = (breedId: string) => {
    setSearchParams((prev) => ({
      ...prev,
      breed: breedId,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No breeds :/</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-4">
        {data.map((breed) => (
          <Button key={breed.id} onClick={() => handleBreedButton(String(breed.id))}>
            {breed.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
