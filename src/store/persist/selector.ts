import { Role, type UserProps } from 'domain/models';
import { decryptData } from 'main/utils';
import { store } from 'store';

export const getUser = (): UserProps => {
  const user = decryptData(store.getState().persist.user || '');

  if (user) return JSON.parse(user) as UserProps;

  return { id: '', role: Role.common, username: '' };
};
