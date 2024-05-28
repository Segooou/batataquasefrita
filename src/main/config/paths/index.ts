/* eslint-disable sort-keys-fix/sort-keys-fix */
export enum routePaths {
  login = '/',
  panel = '/painel',
  user = '/usuarios',
  home = '/plataforma',
  platform = '/plataforma/:platformKeyword',
  functionality = '/plataforma/:platformKeyword/:functionalityKeyword',
  profile = '/perfil',
  recoverPassword = '/recuperar-senha',
  register = '/cadastro'
}

export const paths = {
  login: '/',
  home: '/plataforma',
  panel: '/usuarios',
  user: '/painel',
  platform: (platformKeyword: string): string => `/plataforma/${platformKeyword}`,
  functionality: (platformKeyword: string, functionalityKeyword: string): string =>
    `/plataforma/${platformKeyword}/${functionalityKeyword}`,
  profile: '/perfil',
  recoverPassword: '/recuperar-senha',
  register: '/cadastro'
};

export const apiPaths = {
  default: '/default',
  auth: '/login',
  resetPassword: '/reset-password',
  platform: '/platform',
  action: '/action',
  user: '/user',
  favoriteUserFunctionality: '/favorite-user-functionality',
  functionality: '/functionality',
  newFunctionality: '/new-functionality',
  email: 'email'
};
