import { Add, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button } from '@mui/material';
import { CanvasPreview } from 'presentation/atomic-component/molecule/canvas-preview';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { type FC, useState } from 'react';
import { InputsOnImage } from 'presentation/atomic-component/molecule/inputs-on-image';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { backCnh, frontCnh } from 'main/mock/image';
import { callToast, resolverError } from 'main/utils';
import { setCanvasImage } from 'store/canvas-image/slice';
import { useAppSelector } from 'store';
import { useDebounce } from 'data/hooks';
import { useDispatch } from 'react-redux';
import type { ImagesOnFunctionality } from 'domain/models';

interface ImagesOnFunctionalityProps {
  imagesOnFunctionality: ImagesOnFunctionality;
}

export const ImagesOnFunctionalityComponent: FC<ImagesOnFunctionalityProps> = ({
  imagesOnFunctionality
}) => {
  const { itemSelected } = useAppSelector((state) => state.canvasImage);
  const dispatch = useDispatch();

  const [openDebounce, setOpenDebounce] = useState(false);
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState(true);

  const [inputOnImageData, setInputOnImageData] = useState(
    imagesOnFunctionality?.inputOnImage ?? []
  );

  const updateInputOnImage = async (): Promise<void> => {
    try {
      await api.put({
        body: {
          inputOnImage: inputOnImageData
        },
        id: imagesOnFunctionality.id,
        route: apiPaths.functionalityImage
      });
      callToast.success('Atualizado com sucesso');
    } catch (error) {
      resolverError(error);
    }
  };

  useDebounce(
    () => {
      if (first) setFirst(false);
      else setOpen(!open);
    },
    [openDebounce],
    100
  );

  return (
    <div
      className={`border rounded-md p-4 w-full flex flex-col gap-4 mb-8 ${imagesOnFunctionality.id === itemSelected ? 'border-primary' : ''}`}
    >
      <div className={'flex justify-between items-center'}>
        <img
          alt={'imagem adicionada'}
          src={imagesOnFunctionality.url}
          style={{ maxHeight: '80px' }}
        />

        <div className={'flex gap-4'}>
          <Button
            onClick={(): void => {
              setInputOnImageData(frontCnh);
            }}
          >
            Frente CNH
          </Button>

          <Button
            onClick={(): void => {
              setInputOnImageData(backCnh);
            }}
          >
            Verso CNH
          </Button>
        </div>

        <Button
          onClick={(): void => {
            if (imagesOnFunctionality.id === itemSelected)
              dispatch(setCanvasImage({ itemSelected: null }));
            else dispatch(setCanvasImage({ itemSelected: imagesOnFunctionality.id }));
          }}
        >
          {imagesOnFunctionality.id === itemSelected ? 'Tirar preview' : 'Ver preview'}
        </Button>

        <DeleteConfirmationModal
          id={`image-on-functionality/${imagesOnFunctionality.id}`}
          queryName={QueryName.functionalityImage}
          route={apiPaths.functionalityImage}
          successMessage={'Deletado com sucesso'}
          text={'Tem certeza que deseja deletar essa imagem?'}
          title={'Deletar imagem'}
        />
      </div>

      <div className={'flex w-full gap-4 items-center justify-center'}>
        <h2>
          {inputOnImageData?.length === 0
            ? 'Nenhuma input adicionado'
            : `Inputs adicionados: ${inputOnImageData?.length}`}
        </h2>

        <Button
          onClick={(): void => {
            setTimeout(() => {
              const oldInputOnImage = [...inputOnImageData];

              oldInputOnImage.push({
                color: 'black',
                height: 0,
                left: 0,
                rotate: 1,
                size: '20',
                text: '',
                top: 0,
                value: '',
                width: 0
              });
              setInputOnImageData(oldInputOnImage);
            });
          }}
          startIcon={<Add />}
        >
          {inputOnImageData?.length === 0 ? 'Adicionar input' : 'Nova input'}
        </Button>

        <Button
          onClick={(): void => {
            setTimeout(() => {
              setOpenDebounce(!openDebounce);
            });
          }}
          startIcon={open ? <ArrowUpward /> : <ArrowDownward />}
        >
          {open ? 'Fechar lista' : 'Ver Lista'}
        </Button>
      </div>

      {itemSelected === imagesOnFunctionality.id ? (
        <CanvasPreview inputOnImage={inputOnImageData} url={imagesOnFunctionality.url} />
      ) : null}

      {open ? (
        <>
          <InputsOnImage
            inputOnImageData={inputOnImageData}
            itemSelected={imagesOnFunctionality.id}
            setInputOnImageData={setInputOnImageData}
          />

          <div className={'py-8'}>
            <Button onClick={updateInputOnImage}>Salvar</Button>
          </div>
        </>
      ) : null}
    </div>
  );
};
