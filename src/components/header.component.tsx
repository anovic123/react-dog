import { FC } from 'react'; 
import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
  
 interface HeaderProps {} 
  
 export const Header: FC<HeaderProps> = ({}) => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/">
          Home
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
  };