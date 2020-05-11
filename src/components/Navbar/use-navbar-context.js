import { useContext } from 'react';
import NavbarContext from './Navbar-context';

const useNabvar = () => {
  const context = useContext(NavbarContext);
  return context;
};

export default useNabvar;
