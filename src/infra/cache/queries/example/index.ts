import { useFindQuery } from 'infra/cache/queries/default-query';
import type { UseQueryResult } from 'react-query';
import type { useFindQueryProps } from 'infra/cache/queries/default-query';

interface Example {
  a: string;
}

export const useFindExampleQuery = ({ ...props }: useFindQueryProps): UseQueryResult<Example[]> =>
  useFindQuery<Example[]>({ ...props, route: 'default' });

export const useFindOneExampleQuery = ({
  ...props
}: useFindQueryProps & { id: string }): UseQueryResult<Example> =>
  useFindQuery<Example>({ ...props, route: 'default' });
