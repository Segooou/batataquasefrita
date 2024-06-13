import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ImageFunctionality } from 'presentation/atomic-component/molecule/image-functionality';
import { Pagination } from 'presentation/atomic-component/molecule/pagination';
import { QueryName, apiPaths } from 'main/config';
import { UploadImageModal } from 'presentation/atomic-component/molecule/modal/upload-image';
import { api } from 'infra/http';
import { queryClient } from 'infra/lib';
import { resolverError } from 'main/utils';
import { useFindFunctionalityImageQuery } from 'infra/cache';
import { usePagination } from 'data/hooks';
import type { FC } from 'react';
import type { Functionality } from 'domain/models';

interface ImageFunctionalityFormProps {
  functionality: Functionality;
}

export const ImageFunctionalityForm: FC<ImageFunctionalityFormProps> = ({ functionality }) => {
  const { handleChangePage, page } = usePagination();

  const functionalityImageQuery = useFindFunctionalityImageQuery({
    limit: 5,
    page,
    params: {
      functionalityId: functionality.id
    }
  });

  return (
    <div className={'flex flex-col gap-6 my-4'}>
      <div>
        <UploadImageModal />
      </div>

      <div className={'flex gap-2 items-center justify-center '}>
        <h2>Variantes de imagens</h2>

        <Button
          onClick={async (): Promise<void> => {
            try {
              await api.post({
                body: {
                  functionalityId: functionality.id
                },
                route: apiPaths.functionalityImage
              });
              queryClient.invalidateQueries(QueryName.functionalityImage);
            } catch (error) {
              resolverError(error);
            }
          }}
          startIcon={<Add />}
        >
          Novo Item
        </Button>
      </div>

      {functionalityImageQuery.data?.content.map((item) => (
        <ImageFunctionality key={item.id} functionalityImage={item} />
      ))}

      <div>
        <Pagination
          handleChangePage={handleChangePage}
          page={page}
          totalPages={functionalityImageQuery.data?.totalPages}
        />
      </div>
    </div>
  );
};
