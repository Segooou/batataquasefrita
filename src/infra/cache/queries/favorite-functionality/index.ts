import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseFindFunctionalityQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindFavoriteFunctionalityQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindFunctionalityQuery> =>
  useFindQuery<UseFindFunctionalityQuery>({ ...props, route: 'favoriteUserFunctionality' });
