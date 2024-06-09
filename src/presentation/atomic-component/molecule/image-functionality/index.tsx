import { Add, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { DeleteConfirmationModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { type FC, useState } from 'react';
import { ImagesOnFunctionalityComponent } from 'presentation/atomic-component/molecule/images-on-functionality';
import { QueryName, apiPaths } from 'main/config';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';
import type { FunctionalityImage } from 'domain/models';

interface ImageFunctionalityProps {
  functionalityImage: FunctionalityImage;
}

export const ImageFunctionality: FC<ImageFunctionalityProps> = ({ functionalityImage }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      key={functionalityImage.id}
      className={'flex flex-col  gap-3 border rounded-md bg-gray-800 p-3'}
    >
      <div className={'flex gap-4 items-center justify-between'}>
        <div className={'flex w-full gap-4 items-center justify-center'}>
          <h2>
            {functionalityImage.imagesOnFunctionality?.length === 0
              ? 'Nenhuma imagem adicionada'
              : `Imagens adicionadas: ${functionalityImage.imagesOnFunctionality?.length}`}
          </h2>

          <Button
            onClick={(): void =>
              document.getElementById(`input-file-${functionalityImage.id}`)?.click()
            }
            startIcon={<Add />}
          >
            {functionalityImage.imagesOnFunctionality?.length === 0
              ? 'Adicionar imagem'
              : 'Nova imagem'}
          </Button>

          <Button
            onClick={(): void => {
              setOpen(!open);
            }}
            startIcon={open ? <ArrowUpward /> : <ArrowDownward />}
          >
            {open ? 'Fechar lista' : 'Ver Lista'}
          </Button>
        </div>

        <input
          accept={'image/*'}
          className={'hidden'}
          id={`input-file-${functionalityImage.id}`}
          onChange={async (event): Promise<void> => {
            const file = event.target.files?.[0];

            try {
              if (file !== null && file?.type.startsWith('image/')) {
                const formData = new FormData();

                formData.append('image', file);
                formData.append('functionalityImageId', String(functionalityImage.id));
                await api.post({
                  body: formData,
                  id: 'file',
                  isFormData: true,
                  route: apiPaths.functionalityImage
                });
                queryClient.invalidateQueries(QueryName.functionalityImage);
              } else if (file !== null) callToast.error('Selecione uma imagem');
            } catch (error) {
              resolverError(error);
            }

            Object.assign(event.target, { files: [] });
          }}
          type={'file'}
        />

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={functionalityImage?.active}
              onChange={async (event): Promise<void> => {
                try {
                  await api.put({
                    body: { active: event.target.checked },
                    id: `active/${functionalityImage.id}`,
                    route: apiPaths.functionalityImage
                  });
                  queryClient.invalidateQueries(QueryName.functionalityImage);
                  callToast.success('Atualizado com sucesso');
                } catch (error) {
                  resolverError(error);
                }
              }}
            />
          }
          label={'Ativo'}
          labelPlacement={'start'}
        />

        <div className={'w-min flex gap-6'}>
          <DeleteConfirmationModal
            id={functionalityImage.id}
            queryName={QueryName.functionalityImage}
            route={apiPaths.functionalityImage}
            successMessage={'Deletado com sucesso'}
            text={'Tem certeza que deseja deletar essa imagem?'}
            title={'Deletar imagem'}
          />
        </div>
      </div>

      {open ? (
        <div className={'flex flex-col gap-4'}>
          {functionalityImage.imagesOnFunctionality.map((item2) => (
            <ImagesOnFunctionalityComponent
              key={String(item2.createdAt)}
              imagesOnFunctionality={item2}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
