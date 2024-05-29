/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InputProps } from 'domain/models';

const defaultProps = {
  value: '',
  isRequired: true,
  error: false,
  createdAt: new Date(),
  finishedAt: null,
  mask: null,
  maskLength: null,
  updatedAt: new Date()
};

export const inputPropsSheet1: InputProps[] = [
  {
    id: 0,
    label: 'Id da planilha',
    formValue: 'spreadsheetId',
    placeholder: '',
    type: 'text',
    colSpan: true,
    ...defaultProps
  },
  {
    id: 1,
    label: 'Nome da planilha',
    formValue: 'sheetName',
    placeholder: '',
    type: 'text',
    ...defaultProps
  },
  {
    id: 2,
    label: 'Coluna para resposta',
    formValue: 'resultColumn',
    uppercase: true,
    placeholder: '',
    type: 'text',
    ...defaultProps
  },
  {
    id: 3,
    label: 'Coluna do E-mail',
    formValue: 'email',
    uppercase: true,
    placeholder: '',
    type: 'text',
    ...defaultProps
  },
  {
    id: 4,
    label: 'Coluna da Senha',
    formValue: 'password',
    uppercase: true,
    placeholder: '',
    type: 'text',
    ...defaultProps
  },
  {
    id: 5,
    label: 'Linha para começar',
    formValue: 'startRow',
    placeholder: '',
    type: 'number',
    ...defaultProps
  },
  {
    id: 6,
    label: 'Linha para terminar',
    formValue: 'endRow',
    placeholder: '',
    type: 'number',
    ...defaultProps
  }
];
