import { FC } from 'react';
import { useRandomDogsData } from '../api/use.random-dog-data.hook';
import { Spinner } from 'flowbite-react';
import { DogCard } from '../components/dog-card.component';
import { Button } from '../components/button.component';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useRandomDogsData();
  // console.log(data);

  if (isError) {
    return <div>Oops, something wrong happend</div>;
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!data) {
    return <div>No dogs :\</div>;
  }

  return (
    <div className="p-8 relative">
      <div className="flex flex-wrap gap-8 justify-center mb-8">
        {data.pages.map((page) => {
          return page.map((data) => (
            <DogCard
              key={data.id}
              image={data.url}
              name={data.breeds.map((b) => b.name).join(',') || 'Cute cats'}
              dogId={data.id}
            />
          ));
        })}
      </div>
      <div className="absolute bottom-0 right-1/2 translate-x-2/4">
        <Button isLoading={isFetchingNextPage} onClick={() => fetchNextPage()} size="xl">
          Load more
        </Button>
      </div>
    </div>
  );
};
