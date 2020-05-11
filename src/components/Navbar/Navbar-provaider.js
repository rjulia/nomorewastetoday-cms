import React, { useState } from 'react';
import NavbarContext from './Navbar-context';

function NavbarProvaider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getImages = (images) => {
    setImages(images);
  };

  const contextValue = {
    images,
    getImages,
    isOpen,
    toggleMenu,
  };

  return <NavbarContext.Provider value={contextValue}>{children}</NavbarContext.Provider>;
}

export default NavbarProvaider;
