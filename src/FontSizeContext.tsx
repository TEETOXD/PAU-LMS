import { createContext, useState, useContext, ReactNode } from 'react';

type FontSize = 'small' | 'normal' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  changeFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  
  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
    const html = document.documentElement;
    html.classList.remove('small', 'normal', 'large');
    html.classList.add(size);
    
    // Set the root font-size
    if (size === 'small') html.style.fontSize = '16px';
    if (size === 'normal') html.style.fontSize = '18px';
    if (size === 'large') html.style.fontSize = '22px';
  };
  
  return (
    <FontSizeContext.Provider value={{ fontSize, changeFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}