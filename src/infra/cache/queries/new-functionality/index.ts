import { useFindQuery } from 'infra/cache/queries/default-query';
import type { NewFunctionality, UseFindNewFunctionalityQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindNewFunctionalityQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindNewFunctionalityQuery> =>
  useFindQuery<UseFindNewFunctionalityQuery>({ ...props, route: 'newFunctionality' });

export const useFindOneNewFunctionalityQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<NewFunctionality> =>
  useFindQuery<NewFunctionality>({ ...props, route: 'newFunctionality' });
