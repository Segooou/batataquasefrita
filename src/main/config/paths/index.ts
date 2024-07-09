/* eslint-disable sort-keys-fix/sort-keys-fix */
export enum routePaths {
  login = '/',
  panel = '/painel',
  functionalityTest = '/painel/teste-de-funcinalidade/:functionalityKeyword',
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
  panel: '/painel',
  functionalityTest: (functionalityKeyword: string): string =>
    `/painel/teste-de-funcinalidade/${functionalityKeyword}`,
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
  executeFunctionality: '/functionality/execute',
  platform: '/platform',
  action: '/action',
  user: '/user',
  favoriteUserFunctionality: '/favorite-user-functionality',
  functionality: '/functionality',
  functionalityImage: '/functionality-image',
  uploadImages: '/image/upload',
  newFunctionality: '/new-functionality',
  userFunctionality: '/user-functionalities',
  email: 'email'
};
