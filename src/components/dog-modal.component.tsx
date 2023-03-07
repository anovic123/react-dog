import { FC, useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';
import { useSingleDogData } from '../api/use-single-dog-data.hook';

interface DogModalProps {}

export const DogModal: FC<DogModalProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const dog = searchParams.get('dog');

  useEffect(() => {
    setIsOpened(!!dog);
  }, [dog]);

  const { data, isLoading, isError } = useSingleDogData({ id: dog });
  console.log(data);

  const closeModal = () => {
    setSearchParams({});
  };

  return (
    <>
      <Modal show={isOpened} onClose={closeModal} className="h-screen">
        <Modal.Header>
          {isLoading ? 'Loading...' : data?.breeds?.map((b) => b.name).join(',') || 'Cute kitty'}
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-6">
            {data?.url && <img src={data?.url} width="500px" height="500px" />}
            {data?.breeds && (
              <>
                <p className="p-5">{data.breeds[0].temperament}</p>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
