import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import { InputsOfImageData } from 'presentation/atomic-component/molecule/inputs-of-image-data';
import { useAppSelector } from 'store';
import type { InputOnImageProps } from 'domain/models';

interface InputsOnImageProps {
  inputOnImageData: InputOnImageProps[];
  setInputOnImageData: Dispatch<SetStateAction<InputOnImageProps[]>>;
  itemSelected: number;
}

export const InputsOnImage: FC<InputsOnImageProps> = ({
  inputOnImageData,
  setInputOnImageData,
  itemSelected
}) => {
  const { itemSelected: itemSelected2 } = useAppSelector((state) => state.canvasImage);

  useEffect(() => {
    if (itemSelected2 === null) document.body.style.overflow = 'auto';
    else document.body.style.overflow = 'hidden';
  }, [itemSelected2]);

  return (
    <div className={'flex flex-col gap-4 my-4'}>
      {inputOnImageData.map((item, index) => (
        <InputsOfImageData
          key={`${item.value}-${item.text}`}
          index={index}
          inputOnImage={item}
          inputOnImageDataArray={inputOnImageData}
          itemSelected={itemSelected}
          setInputOnImageDataArray={setInputOnImageData}
        />
      ))}
    </div>
  );
};
