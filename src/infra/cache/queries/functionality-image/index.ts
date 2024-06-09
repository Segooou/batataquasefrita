import { useFindQuery } from 'infra/cache/queries/default-query';
import type { FunctionalityImage, UseFindFunctionalityImageQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindFunctionalityImageQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindFunctionalityImageQuery> =>
  useFindQuery<UseFindFunctionalityImageQuery>({ ...props, route: 'functionalityImage' });

export const useFindOneFunctionalityImageQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<FunctionalityImage> =>
  useFindQuery<FunctionalityImage>({ ...props, route: 'functionalityImage' });
