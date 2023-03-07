import { FC } from 'react';
import { HomePage } from './pages/home.page';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return <div>
    <HomePage />
  </div>;
};
