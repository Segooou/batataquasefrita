import { DraggableContainer } from 'presentation/atomic-component/atom';
import { type FC, useState } from 'react';
import {
  NewFunctionalityModal,
  ShowNewFunctionalityModal
} from 'presentation/atomic-component/molecule/modal';
import { useFindNewFunctionalityQuery } from 'infra/cache';
import { useModal } from 'data/hooks';
import type { NewFunctionality } from 'domain/models';

export const DraggableNewFunctionality: FC = () => {
  const newFunctionalityQuery = useFindNewFunctionalityQuery({
    params: {
      orderBy: 'wasRaised',
      sort: 'asc'
    }
  });

  const [newFunctionalitySelected, setNewFunctionalitySelected] = useState<NewFunctionality | null>(
    null
  );

  const modal = useModal();

  const break2 = 8;

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex gap-2 flex-col tablet:flex-row items-center justify-between'}>
        <h2 className={'font-semibold text-xl'}>Novas funcionalidades solicitadas</h2>
        <NewFunctionalityModal />
      </div>

      <DraggableContainer
        break2={break2}
        height={
          newFunctionalityQuery.data?.content &&
          newFunctionalityQuery.data?.content.length >= break2
            ? 240
            : 140
        }
      >
        {newFunctionalityQuery.data?.content.map((item) => {
          return (
            <div
              key={item.id}
              className={
                'min-w-[200px] flex-col gap-2 px-6 bg-gray-700 border border-gray-550 rounded-md h-[100px] bg-blue-500 flex items-center justify-center text-white'
              }
              onClick={(): void => {
                setNewFunctionalitySelected(item);
                modal.openModal();
              }}
              style={{
                backgroundColor: item.wasRaised ? '#224e22' : undefined
              }}
            >
              <span className={'text-center'}>{item.name}</span>

              <span>
                Plataforma: <span className={'font-semibold'}>{item.platform.name}</span>
              </span>
            </div>
          );
        })}
      </DraggableContainer>

      {newFunctionalitySelected ? (
        <ShowNewFunctionalityModal
          modal={{
            ...modal,
            closeModal() {
              setNewFunctionalitySelected(null);
              modal.closeModal();
            }
          }}
          newFunctionality={newFunctionalitySelected}
        />
      ) : null}
    </div>
  );
};
