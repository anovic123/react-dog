import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <nav className="flex gap-5 justify-center p-5 text-xl">
      <Link to="/" className="hover:text-red-700">
        Home
      </Link>
      <Link to="/breed" className="hover:text-red-700">
        Breeds
      </Link>
    </nav>
  );
};
