import { callToast } from 'main/utils/call-toast';

export const resolverError = (err: unknown, message?: string): void => {
  const error = err as {
    message: { english: string; portuguese: string };
  };

  callToast.error(message ?? error?.message?.portuguese ?? 'Erro na requisição');
};
