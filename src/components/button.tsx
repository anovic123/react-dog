import { FC, ComponentProps, PropsWithChildren } from 'react';
import { Button as ButtonFlowbite, Spinner } from 'flowbite-react';

interface ButtonProps {
  onClick: ComponentProps<'button'>['onClick'];
  size?: ComponentProps<typeof ButtonFlowbite>['color'];
  isLoading?: boolean;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  isLoading,
  size,
}) => {
  return (
    <ButtonFlowbite onClick={onClick} disabled={isLoading} size={size}>
      {isLoading ? (
        <>
          <div className="mr-3">
            <Spinner size="sm" light={true} />
          </div>
          Loading ...
        </>
      ) : (
        children
      )}
    </ButtonFlowbite>
  );
};
