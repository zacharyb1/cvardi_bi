import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ImageContextProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<string[]>([
    'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ]);

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within a ImageProvider');
  }
  return context;
};