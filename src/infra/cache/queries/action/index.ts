import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseFindActionQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindActionQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindActionQuery> =>
  useFindQuery<UseFindActionQuery>({ ...props, route: 'action' });
