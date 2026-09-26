import { useWindowDimensions, Platform, StatusBar } from 'react-native';

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  
  return {
    isLandscape: width > height,
    isTablet: width >= 768,
    columns: width >= 768 ? 3 : width >= 480 ? 2 : 1,
    cardWidth: width >= 768 
      ? (width - 48 - 24) / 3 
      : width >= 480 
        ? (width - 32 - 16) / 2
        : width - 32,
  };
}
