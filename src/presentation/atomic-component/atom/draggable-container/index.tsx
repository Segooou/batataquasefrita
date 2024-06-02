import { Children, cloneElement, useRef, useState } from 'react';
import { random } from 'main/utils';
import type { FC, MouseEvent, ReactElement, ReactNode } from 'react';

interface DraggableContainerProps {
  children: ReactNode;
  height: number;
  break2?: number;
}

export const DraggableContainer: FC<DraggableContainerProps> = ({ children, height, break2 }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClick, setIsClick] = useState(true);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    if (event.buttons === 2) event.preventDefault();
    else {
      if (event.buttons === 4) event.preventDefault();

      const element = scrollContainerRef.current;

      if (element) {
        setIsDragging(true);
        setIsClick(true);
        setStartX(event.pageX - element.offsetLeft);
        setScrollLeft(element.scrollLeft);
      }
    }
  };

  const handleMouseLeave = (): void => {
    setIsDragging(false);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const element = scrollContainerRef.current;

    if (element) {
      event.preventDefault();
      const x = event.pageX - element.offsetLeft;
      const walk = (x - startX) * 1;

      element.scrollLeft = scrollLeft - walk;

      if (Math.abs(walk) > 1) setIsClick(false);
    }
  };

  const aaa = Children.toArray(children);

  const ReturnItem = (Element: ReactNode): ReactNode =>
    cloneElement(Element as ReactElement, {
      onClick() {
        /*  */
      },
      onMouseUp(event: unknown) {
        if (isClick) {
          const newChild = Element as {
            props?: { onClick?: (event: unknown) => void };
          };

          if (newChild?.props?.onClick) newChild?.props?.onClick(event);
        }
      }
    });

  return (
    <div
      className={
        'w-full rounded-md overflow-x-auto overflow-y-hidden bg-gray-800 px-4 cursor-grab active:cursor-grabbing flex items-center gap-4'
      }
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={scrollContainerRef}
      style={{ height }}
    >
      {aaa?.map((item, index) => {
        const item1 = aaa[index];

        if (break2 && aaa.length >= break2) {
          if (item && index % 2 === 0) {
            const item2 = aaa[index] as { props: { className: string } };

            return (
              <div key={random()} className={'flex flex-col gap-4'}>
                {ReturnItem(item1)}

                {aaa[index + 1] ? (
                  ReturnItem(aaa[index + 1])
                ) : (
                  <div className={`${item2?.props?.className} bg-gray-800 border-none`} />
                )}
              </div>
            );
          }

          return null;
        }
        return ReturnItem(item1);
      })}
    </div>
  );
};
