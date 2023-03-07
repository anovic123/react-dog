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
            {data?.url && <img src={data?.url} />}
            {data?.breeds ? (
              <>
                <p className="p-5">{data.breeds[0].temperament}</p>
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
