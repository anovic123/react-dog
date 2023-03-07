import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BreedModal } from './components/breed-modal.component';
import { DogModal } from './components/dog-modal.component';
import { Header } from './components/header.component';
import { BreedPage } from './pages/breed.page';
import { HomePage } from './pages/home.page';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};
