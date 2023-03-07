import { FC } from 'react';
import { useRandomDogsData } from '../api/use-random-dog-data.hook';
import { v1 } from 'uuid';
import { DogCard } from '../components/dog-card.component';
import { Button } from '../components/button.component';
import { Skeleton } from '../components/skeleton.component';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useRandomDogsData();
  // console.log(data);

  if (isError) {
    return <div>Oops, something wrong happend</div>;
  }

  if (isLoading) {
    return (
      <div className="p-8 relative">
        <div className="flex flex-wrap gap-16 justify-center mb-8">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={v1()} />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>No dogs :\</div>;
  }

  return (
    <div className="p-8 relative">
      <div className="flex flex-wrap gap-10 justify-center mb-8">
        {data.pages.map((page) => {
          return page.map((data) => (
            <DogCard
              key={data.id}
              image={data.url}
              name={data.breeds.map((b) => b.name).join(',') || 'Cute dogs'}
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
