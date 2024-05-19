import { dimensions } from 'main/config';
import { useEffect } from 'react';
import { useWindowDimensions } from 'data/hooks';
import type { FC, ReactNode } from 'react';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

interface FetchOnScrollProps {
  query: {
    fetchNextPage: (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };
  mobileWindow?: boolean;
  children: ReactNode;
  id: string;
}

export const FetchOnScroll: FC<FetchOnScrollProps> = ({
  query: { isFetchingNextPage, hasNextPage, fetchNextPage },
  id,
  mobileWindow,
  children
}) => {
  const { width } = useWindowDimensions();

  const handleScroll = (): void => {
    if (width >= dimensions.laptop || !mobileWindow) {
      const element = document.getElementById(id);

      if (element) {
        const { scrollTop, clientHeight, scrollHeight } = element;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;

        if (isScrolledToBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
      }
    } else {
      const { body } = document;
      const html = document.documentElement;
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight + 50 === height && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
      else if (scrollPosition + windowHeight === height && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
    }
  };

  useEffect(() => {
    let element: HTMLElement | Window | null = null;

    if (width >= dimensions.laptop || !mobileWindow) element = document.getElementById(id);
    else element = window;

    if (element) element.addEventListener('scroll', handleScroll);
    return () => {
      if (element) element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return children;
};
