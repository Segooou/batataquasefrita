import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseFindUserQuery, UserProps } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindUserQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindUserQuery> =>
  useFindQuery<UseFindUserQuery>({ ...props, route: 'user' });

export const useFindOneUserQuery = ({
  ...props
}: useFindQueryProps & { id: number | string }): UseQueryResult<UserProps> =>
  useFindQuery<UserProps>({ ...props, route: 'user' });
