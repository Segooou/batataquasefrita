import { useFindQuery } from 'infra/cache/queries/default-query';
import type { Functionality, UseFindFunctionalityQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindFunctionalityQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindFunctionalityQuery> =>
  useFindQuery<UseFindFunctionalityQuery>({ ...props, route: 'functionality' });

export const useFindOneFunctionalityQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Functionality> =>
  useFindQuery<Functionality>({ ...props, route: 'functionality' });

export const useFindOneFunctionalityKeywordQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Functionality> =>
  useFindQuery<Functionality>({ ...props, id: `keyword/${props.id}`, route: 'functionality' });
