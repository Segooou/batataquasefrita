import type { FC, ReactNode } from 'react';

interface GenericCardProps {
  title: ReactNode | string;
  description: ReactNode | string;
  startElement?: ReactNode | string;
  endElement?: ReactNode | string;
  onClick?: () => void;
}

export const GenericCard: FC<GenericCardProps> = ({
  title,
  description,
  onClick,
  endElement,
  startElement
}) => {
  return (
    <div
      className={
        'flex items-center w-full gap-2 shadow-[0px_0px_6px_1px_rgba(0,0,0,0.2)] rounded-2xl p-4 px-4 tablet:px-8 cursor-pointer hover:bg-[#f7f7f7]'
      }
      onClick={onClick}
    >
      {startElement}

      <div className={'flex flex-col gap-2 w-full'}>
        <p className={'text-blue-semiDark font-extrabold text-lg'}>{title}</p>
        <p className={'text-blue-semiDark font-light text-base line-clamp-2'}>{description}</p>
      </div>

      {endElement}
    </div>
  );
};
