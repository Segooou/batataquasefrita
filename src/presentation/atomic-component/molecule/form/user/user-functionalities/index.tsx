import { Button } from '@mui/material';
import { type FC, useState } from 'react';
import { QueryName, apiPaths } from 'main/config';
import { Select, type SelectValues } from 'presentation/atomic-component/atom/select';
import { api } from 'infra/http';
import { callToast, resolverError } from 'main/utils';
import { queryClient } from 'infra/lib';
import type { Functionality, UserFunctionalities, UserPlatforms, UserProps } from 'domain/models';

interface UserFunctionalitiesFromProps {
  user: UserProps;
  functionality: Pick<Functionality, 'id' | 'name' | 'platform'>[];
  startUserFunctionalities: SelectValues[];
}

export const UserFunctionalitiesFrom: FC<UserFunctionalitiesFromProps> = ({
  user,
  functionality,
  startUserFunctionalities
}) => {
  const [userFunctionalities, setUserFunctionalities] =
    useState<SelectValues[]>(startUserFunctionalities);

  const sendRequest = async (): Promise<void> => {
    const userFunctionalitiesValues: UserFunctionalities[] = [];
    const userPlatformsValues: UserPlatforms[] = [];

    userFunctionalities?.forEach((item) => {
      const func = functionality.find(
        (functionalityValues) => functionalityValues.id === Number(item.value)
      );

      if (func) {
        userFunctionalitiesValues.push({
          functionalityId: func.id,
          userId: user.id
        });
        userPlatformsValues.push({
          platformId: func.platform.id,
          userId: user.id
        });
      }
    });

    try {
      await api.put({
        body: {
          functionalities: userFunctionalitiesValues,
          platforms: userPlatformsValues,
          userId: user.id
        },
        route: apiPaths.userFunctionality
      });
      callToast.success('Atualizado com sucesso');

      queryClient.invalidateQueries(QueryName.user);
    } catch (error) {
      resolverError(error);
    }
  };

  return (
    <div className={'flex flex-col gap-4 w-full'}>
      <Button
        onClick={(): void => {
          const newFunctionalitiesValues = functionality.map((item) => ({
            label: `${item.platform.name} - ${item.name}`,
            value: String(item.id)
          }));

          setUserFunctionalities(newFunctionalitiesValues);
        }}
      >
        Selecionar todos
      </Button>

      <Select
        id={'select-user-functionalities'}
        isMultiple
        label={'Funcionalidades Permitidas'}
        onChange={(event): void => {
          const values = (event as SelectValues[] | null) ?? [];

          setUserFunctionalities(values);
        }}
        options={functionality.map((item) => ({
          label: `${item.platform.name} - ${item.name}`,
          value: String(item.id)
        }))}
        tagsMaxHeight={'182px'}
        value={userFunctionalities}
      />

      <Button onClick={sendRequest}>Salvar</Button>
    </div>
  );
};
