import { decryptData } from 'main/utils';
import { store } from 'store';

interface UserProps {
  id: string;
  email: string;
}
export const getUser = (): UserProps => {
  const user = decryptData(store.getState().persist.user || '');

  if (user) return JSON.parse(user) as UserProps;

  return { email: '', id: '' };
};
