import { store } from 'store';

export const getRedirectPath = (): string | null => store.getState().redirect.path || null;
