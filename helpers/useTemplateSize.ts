import useWindowWidth from './useWindowWidth';

export const useTemplateSize = (isInSelector?: boolean) => {
  const windowWidth = useWindowWidth();
  if (!isInSelector || windowWidth >= 595) {
    return {};
  }

  const width = windowWidth - 80;
  const height = Math.SQRT2 * width;
  const fontSize = windowWidth / 33.05555;
  return { width, height, fontSize };
};
