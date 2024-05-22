import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseQueryResult } from 'react-query';
import type { UserProps } from 'domain/models';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindOneUserQuery = ({
  ...props
}: useFindQueryProps & { id: number | string }): UseQueryResult<UserProps> =>
  useFindQuery<UserProps>({ ...props, route: 'user' });
