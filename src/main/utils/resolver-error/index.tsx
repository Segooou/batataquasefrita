import { callToast } from 'main/utils/call-toast';

export const resolverError = (err: unknown, message?: string): void => {
  const error = err as { message: string };

  callToast.error(message ?? error.message ?? 'Erro na requisição');
};
