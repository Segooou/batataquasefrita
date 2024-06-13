import { Button } from '@mui/material';
import { type FC, useState } from 'react';
import { ImageModal } from 'presentation/atomic-component/molecule/modal/image';
import { Modal } from 'presentation/atomic-component/atom/modal';
import { Select } from 'presentation/atomic-component/atom/select';
import { api } from 'infra/http';
import { apiPaths } from 'main/config';
import { callToast, resolverError } from 'main/utils';
import { toast } from 'react-toastify';
import { useModal } from 'data/hooks';
import type { SelectValues } from 'presentation/atomic-component/atom/select';

export const UploadImageModal: FC = () => {
  const { closeModal, isOpen, openModal } = useModal();

  const [selectValue, setSelectValue] = useState<SelectValues | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      openModal={openModal}
      openModalElement={
        <Button className={'w-[350px]'} onClick={openModal}>
          Subir imagens
        </Button>
      }
      size={'medium'}
      title={'Enviar imagens para API'}
    >
      <div className={'flex flex-col gap-4 p-8'}>
        <Select
          id={'select-image'}
          label={'Selecione a pasta para enviar'}
          onChange={(event): void => {
            const value = event as SelectValues;

            setSelectValue(value ?? null);
          }}
          options={[
            { label: 'Homem', value: 'homem' },
            { label: 'Mulher', value: 'mulher' }
          ]}
          value={selectValue}
        />

        <Button onClick={(): void => document.getElementById('input-to-upload-image')?.click()}>
          Selecionar imagens
        </Button>

        <input
          accept={'image/*'}
          className={'hidden'}
          id={'input-to-upload-image'}
          multiple
          onChange={(event): void => {
            const allFiles = event.target.files;

            const items: File[] = [...files];

            if (allFiles?.length && allFiles.length > 0)
              for (const iterator of allFiles)
                if (iterator.type.startsWith('image')) items.push(iterator);

            setFiles(items);
          }}
          type={'file'}
        />

        <div className={'flex flex-col gap-2 max-h-[400px] overflow-auto'}>
          {files.map((file) => (
            <div key={file.name} className={'flex items-center text-white gap-2'}>
              <ImageModal url={URL.createObjectURL(file)} />
              <div>{file.name}</div>
            </div>
          ))}
        </div>

        <div className={'flex gap-4 justify-center mt-8'}>
          <Button
            onClick={async (): Promise<void> => {
              try {
                const formData = new FormData();

                if (selectValue === null) {
                  callToast.error('Selecione uma pasta');
                  return;
                }

                if (files.length === 0) {
                  callToast.error('Selecione pelo menos 1 imagem');
                  return;
                }

                formData.append('folder', selectValue.value);

                callToast.loading('Enviando imagens', { autoClose: false });

                files.forEach((file) => {
                  formData.append('images', file);
                });

                await api.post({
                  body: formData,
                  isFormData: true,
                  route: apiPaths.uploadImages
                });
                toast.dismiss();

                callToast.success('Enviado com sucesso');
                setFiles([]);
                setSelectValue(null);
                closeModal();
              } catch (error) {
                resolverError(error);
              }
            }}
          >
            Enviar
          </Button>

          <Button color={'error'} onClick={(): void => setFiles([])} variant={'outlined'}>
            Limpar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
