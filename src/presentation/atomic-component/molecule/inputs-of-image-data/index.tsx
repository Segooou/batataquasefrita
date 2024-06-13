import { Button, IconButton } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { LabelInput, NumericInput } from 'presentation/atomic-component/atom';
import { Select } from 'presentation/atomic-component/atom/select';
import { callToast, random } from 'main/utils';
import { setCanvasImage } from 'store/canvas-image/slice';
import { useAppSelector } from 'store';
import { useDebounce } from 'data/hooks';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import type { Dispatch, FC, SetStateAction } from 'react';
import type { InputOnImageProps } from 'domain/models';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

interface InputsOfImageDataProps {
  inputOnImage: InputOnImageProps;
  index: number;
  itemSelected: number;
  inputOnImageDataArray: InputOnImageProps[];
  setInputOnImageDataArray: Dispatch<SetStateAction<InputOnImageProps[]>>;
}

export const InputsOfImageData: FC<InputsOfImageDataProps> = ({
  inputOnImage,
  inputOnImageDataArray,
  setInputOnImageDataArray,
  itemSelected,
  index
}) => {
  const [inputOnImageData, setInputOnImageData] = useState(inputOnImage);

  const id = random();
  const { itemSelected: itemSelected2 } = useAppSelector((state) => state.canvasImage);

  const [selectedFont, setSelectedFont] = useState<SelectValues | null>(
    inputOnImage.font
      ? {
          label: inputOnImage.font,
          value: inputOnImage.font
        }
      : {
          label: 'Arial',
          value: 'Arial'
        }
  );

  const [selectedFolder, setSelectedFolder] = useState<SelectValues | null>(
    inputOnImage.folder
      ? {
          label: inputOnImage.folder,
          value: inputOnImage.folder
        }
      : null
  );

  useDebounce(
    () => {
      const array = [...inputOnImageDataArray];

      array[index] = { ...inputOnImageData };
      setInputOnImageDataArray(array);
    },
    [inputOnImageData],
    400
  );

  const dispatch = useDispatch();

  return (
    <div className={'p-2'}>
      <div className={'flex gap-8 my-4 border p-4'}>
        <div
          className={
            'grid w-full gap-4 grid-cols-[repeat(auto-fill,minmax(240px,240px))] justify-between'
          }
        >
          <LabelInput
            label={'Texto'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, text: event.target.value });
            }}
            value={inputOnImageData?.text}
          />

          <NumericInput
            label={'Esquerda'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, left: event.floatValue ?? 0 });
            }}
            value={inputOnImageData?.left === 0 ? '' : inputOnImageData?.left}
          />

          <NumericInput
            label={'Topo'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, top: event.floatValue ?? 0 });
            }}
            value={inputOnImageData?.top === 0 ? '' : inputOnImageData?.top}
          />

          <Select
            id={`select-font-${inputOnImage.value}-${random()}`}
            isHideClearButton
            label={'Fonte'}
            onChange={(event): void => {
              const selectValue = event as SelectValues | null;

              setSelectedFont(selectValue);
              setInputOnImageData({ ...inputOnImageData, font: selectValue?.value ?? 'Arial' });
            }}
            options={[
              {
                label: 'Arial',
                value: 'Arial'
              },
              {
                label: 'Times New Roman Cyr',
                value: 'Times New Roman Cyr'
              },
              {
                label: 'Homemade Apple',
                value: 'Homemade Apple'
              }
            ]}
            value={selectedFont}
          />

          <NumericInput
            disableDecimal
            label={'Tamanho'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, size: event.value });
            }}
            suffix={'px'}
            value={inputOnImageData?.size}
          />

          <NumericInput
            label={'Rotação'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, rotate: event.floatValue ?? 0 });
            }}
            value={inputOnImageData?.rotate === 0 ? '' : inputOnImageData?.rotate}
          />

          <LabelInput
            label={'Cor'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, color: event.target.value });
            }}
            value={inputOnImageData?.color}
          />

          <LabelInput
            label={'Valor na api'}
            onChange={(event): void => {
              setInputOnImageData({ ...inputOnImageData, value: event.target.value });
            }}
            value={inputOnImageData?.value}
          />

          <Select
            id={`select-folder-${inputOnImage.value}-${random()}`}
            label={'Imagem'}
            onChange={(event): void => {
              const selectValue = event as SelectValues | null;

              setSelectedFolder(selectValue);
            }}
            options={[
              {
                label: 'assinatura',
                value: 'assinatura'
              },
              {
                label: 'homem',
                value: 'homem'
              },
              {
                label: 'mulher',
                value: 'mulher'
              }
            ]}
            value={selectedFolder}
          />

          {selectedFolder ? (
            <>
              <NumericInput
                label={'Largura'}
                onChange={(event): void => {
                  setInputOnImageData({ ...inputOnImageData, width: event.floatValue ?? 0 });
                }}
                value={inputOnImageData?.width === 0 ? '' : inputOnImageData?.width}
              />

              <NumericInput
                label={'Altura'}
                onChange={(event): void => {
                  setInputOnImageData({ ...inputOnImageData, height: event.floatValue ?? 0 });
                }}
                value={inputOnImageData?.height === 0 ? '' : inputOnImageData?.height}
              />

              <div className={'flex gap-2 w-full'}>
                <Button
                  className={'w-full'}
                  onClick={(): void => document.getElementById(id)?.click()}
                >
                  Testar imagem
                </Button>

                <div className={'flex flex-col items-center justify-center'}>
                  <IconButton
                    onClick={(): void => setInputOnImageData({ ...inputOnImageData, text: '' })}
                  >
                    <Close color={'error'} />
                  </IconButton>
                </div>
              </div>

              <input
                accept={'image/*'}
                className={'hidden'}
                id={id}
                onChange={(event): void => {
                  const file = event.target.files?.[0];

                  if (file !== null && file?.type.startsWith('image/')) {
                    const url = URL.createObjectURL(file);

                    setInputOnImageData({ ...inputOnImageData, text: url });
                  } else if (file !== null) callToast.error('Selecione uma imagem');

                  Object.assign(event.target, { files: [] });
                }}
                type={'file'}
              />
            </>
          ) : null}
        </div>

        <div>
          <div
            className={
              'bg-gray-700 hover:bg-gray-550 border border-gray-500 rounded-md p-2 cursor-pointer'
            }
            onClick={(): void => {
              const array = [...inputOnImageDataArray]?.filter((_item, oldIndex) => {
                return oldIndex !== index;
              });

              setInputOnImageDataArray(array);
            }}
          >
            <Delete />
          </div>
        </div>
      </div>

      <Button
        onClick={(): void => {
          if (itemSelected2 === itemSelected) dispatch(setCanvasImage({ itemSelected: null }));
          else dispatch(setCanvasImage({ itemSelected }));
        }}
      >
        Ver preview
      </Button>
    </div>
  );
};
