import { useState, useEffect } from 'react';
import { MediaQuery } from '../types';

type Screens = { [key: string]: string };

const useActiveMediaQuery = (screens: Screens): MediaQuery => {
  const [activeQuery, setActiveQuery] = useState<MediaQuery>(undefined);

  useEffect(() => {
    const mediaQueryLists = Object.keys(screens).map(screen => window.matchMedia(screens[screen]));

    const getActiveScreen = () => {
      const matchingScreens: MediaQuery[] = Object.keys(screens)
        .filter((screen, index) => mediaQueryLists[index].matches)
        .map(screen => screen as MediaQuery);
      setActiveQuery(matchingScreens[matchingScreens.length - 1] || undefined);
    };

    getActiveScreen();

    mediaQueryLists.forEach(mediaQueryList => mediaQueryList.addEventListener('change', getActiveScreen));
    return () => {
      mediaQueryLists.forEach(mediaQueryList => mediaQueryList.removeEventListener('change', getActiveScreen));
    };
  });

  return activeQuery;
};

export default useActiveMediaQuery;
