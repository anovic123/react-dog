import { FC, useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { useSingleDogData } from '../api/use-single-dog-data';
import { useLikeApi } from '../api/use-like-api';
import { Button } from './button';

interface DogModalProps {}

export const DogModal: FC<DogModalProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const dog = searchParams.get('dog');
  const { like, dislike, isLiked, isLoading: isLikeLoading } = useLikeApi({ dogId: dog });

  useEffect(() => {
    setIsOpened(!!dog);
  }, [dog]);

  const { data, isLoading, isError } = useSingleDogData({ id: dog });
  // console.log(data);

  const closeModal = () => {
    setSearchParams({});
  };

  const handleLikeButton = () => {
    if (isLiked) {
      dislike();
    } else {
      like();
    }
  };

  const handleLearnMore = (breedId: string) => {
    setSearchParams({
      breed: breedId,
    });
  };

  if (isError) {
    return <div>Oops, something wrong happend</div>;
  }

  return (
    <>
      <Modal show={isOpened} onClose={closeModal}>
        <Modal.Header>
          {isLoading ? 'Loading...' : data?.breeds?.map((b) => b.name).join(',') || 'Cute dog'}
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-6 justify-center items-center p-3">
            {data?.url && (
              <div className="relative">
                <div className="absolute top-4 right-4">
                  <Button size="sm" onClick={handleLikeButton} isLoading={isLikeLoading}>
                    {isLiked ? (
                      <HeartIconSolid className="h-4 w-4 text-white" />
                    ) : (
                      <HeartIconOutline className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </div>
                <img src={data?.url} />
              </div>
            )}
            {data?.breeds ? (
              <>
                <p className="p-5">{data.breeds[0].temperament}</p>
                <Button onClick={() => handleLearnMore(data.breeds && String(data.breeds[0].id))}>
                  Learn more
                </Button>
              </>
            ) : (
              <p>No temperament</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
