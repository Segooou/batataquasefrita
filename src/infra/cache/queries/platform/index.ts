import { useFindQuery } from 'infra/cache/queries/default-query';
import type { Platform, UseFindPlatformQuery } from 'domain/models';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

export const useFindPlatformQuery = ({
  ...props
}: useFindQueryProps): UseQueryResult<UseFindPlatformQuery> =>
  useFindQuery<UseFindPlatformQuery>({ ...props, route: 'platform' });

export const useFindOnePlatformQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Platform> =>
  useFindQuery<Platform>({ ...props, route: 'platform' });

export const useFindOnePlatformKeywordQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Platform> =>
  useFindQuery<Platform>({ ...props, id: `keyword/${props.id}`, route: 'platform' });
