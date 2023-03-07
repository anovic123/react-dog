import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DogModal } from './components/dog-modal.component';
import { Header } from './components/header.component';
import { HomePage } from './pages/home.page';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <div className="container mx-auto px-4">
      <BrowserRouter>
        <Header />
        <DogModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
