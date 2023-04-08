import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BreedModal } from './components/breed-modal';
import { DogModal } from './components/dog-modal';
import { Header } from './components/header';
import { HomePage } from './pages/home';
import { BreedPage } from './pages/breed';
import { FavoritePage } from './pages/favorite';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <div className="container mx-auto px-4">
      <BrowserRouter>
        <Header />
        <DogModal />
        <BreedModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/breed" element={<BreedPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
