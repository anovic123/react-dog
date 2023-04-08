import { FC } from 'react';
import { v1 } from 'uuid';
import { useFavoriteData } from '../api/use-favorite-data';
import { Button } from '../components/button';
import { DogCard } from '../components/dog-card';
import { Skeleton } from '../components/skeleton';

interface FavoritePageProps {}

export const FavoritePage: FC<FavoritePageProps> = ({}) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useFavoriteData();
  console.log(data);

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
    return <div>No favorite dogs :/</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-8 justify-center mb-8">
        {data.pages.map((page) => {
          return page.map((item) => (
            <DogCard
              key={item.id}
              image={item.image.url}
              name={'Cute dogs'}
              dogId={item.image.id}
            />
          ));
        })}
      </div>
      <div className="text-center">
        {data.pages[data.pages.length - 1].length === 10 && (
          <Button isLoading={isFetchingNextPage} onClick={() => fetchNextPage()}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};
