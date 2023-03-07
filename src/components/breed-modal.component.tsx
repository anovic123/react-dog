import { FC, useState, useEffect } from 'react';
import { Carousel, Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';
import { useRandomDogsData } from '../api/use-random-dog-data.hook';
import { filterSearchParams } from '../utils/searchParams';

interface BreedModalProps {}

export const BreedModal: FC<BreedModalProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const breed = searchParams.get('breed');

  useEffect(() => {
    setIsOpened(!!breed);
  }, [breed]);

  const { data, isLoading } = useRandomDogsData({ breedId: breed });

  const closeModal = () => {
    const paramsObject = filterSearchParams(searchParams, 'breed');

    setSearchParams(paramsObject);
  };

  const handleImgClick = (dogId: string) => {
    setSearchParams((prev) => ({
      ...prev,
      dog: dogId,
    }));
  };

  return (
    <>
      <Modal show={isOpened} onClose={closeModal} className="h-screen">
        <Modal.Header>
          {isLoading
            ? 'Loading...'
            : data?.pages[0][0].breeds.map((b) => b.name).join(',') || 'Cute Dog'}
        </Modal.Header>
        <Modal.Body>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              {data?.pages.map((page) => {
                return page.map((dog) => (
                  <img
                    src={dog.url}
                    alt={dog.id}
                    key={dog.id}
                    onClick={() => handleImgClick(dog.id)}
                  />
                ));
              })}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
