import { createContext } from 'react';
const NavbarContext = createContext({
  images: [],
  getImages: (services) => {},
  isOpen: false,
  toggleMenu: () => {},
});

export default NavbarContext;
