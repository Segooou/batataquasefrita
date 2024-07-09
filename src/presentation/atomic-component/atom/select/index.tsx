/* eslint-disable @typescript-eslint/no-explicit-any */

import { Autocomplete, Chip, TextField } from '@mui/material';
import { colors } from 'presentation/style';
import CloseIcon from '@mui/icons-material/Close';
import type { FC, ReactNode } from 'react';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import type { UseFormRegisterReturn } from 'react-hook-form';

export interface SelectValues {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectValues[];
  value: SelectValues | SelectValues[] | null;
  id: string;
  onChange: (value: SelectValues | SelectValues[] | null | undefined) => void;
  isMultiple?: boolean;
  error?: boolean;
  required?: boolean;
  register?: UseFormRegisterReturn;
  isHideClearButton?: boolean;
  tagsMaxHeight?: number | string;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  query?: {
    fetchNextPage: (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };
}

export const Select: FC<SelectProps> = ({ isMultiple, options, register, value, id, ...props }) => {
  const random = String(Math.random() * 10).replace('.', '-');

  const handleScroll = (): void => {
    if (props.query) {
      const element = document.getElementById(`select-scroll-${id}-${random}`);

      if (element) {
        const { scrollTop, clientHeight, scrollHeight } = element;
        const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;

        if (isScrolledToBottom && props.query.hasNextPage && !props.query.isFetchingNextPage)
          props.query.fetchNextPage();
      }
    }
  };

  return (
    <>
      <Autocomplete
        ListboxProps={{
          id: `select-scroll-${id}-${random}`,
          onMouseLeave(event): void {
            event.target.removeEventListener('scroll', handleScroll);
          },
          onScroll(event): void {
            event.target.addEventListener('scroll', handleScroll);
          },
          style: {
            maxHeight: '300px'
          }
        }}
        clearText={'Limpar'}
        closeText={'Fechar'}
        componentsProps={{
          clearIndicator: {
            id: `clear-indicator-${id}`
          }
        }}
        disableClearable={props.isHideClearButton}
        disableCloseOnSelect={isMultiple}
        fullWidth
        isOptionEqualToValue={(option: SelectValues, item: SelectValues): boolean =>
          option?.value === item?.value
        }
        loading={props.isLoading}
        loadingText={'Carregando...'}
        multiple={isMultiple}
        noOptionsText={'Nenhum dado encontrado'}
        onChange={(_event, data): void => {
          props.onChange(data);
          if (!data && props.onClear) props.onClear();
        }}
        onChangeCapture={(event: any): void => {
          if (props.onSearch) props.onSearch((event.target?.value as string) ?? '');
        }}
        openText={'Abrir'}
        options={options}
        renderInput={({ InputProps, ...params }): ReactNode => {
          const { startAdornment, ...rest } = InputProps;

          const hasItems = startAdornment as { props: { children: [] } };

          return (
            <>
              <TextField
                {...params}
                InputProps={{
                  ...rest,
                  style: {
                    paddingBottom: '6.5px',
                    paddingTop: '6.5px'
                  }
                }}
                error={props.error}
                id={`select-${id}`}
                label={
                  <span>
                    {props.label}
                    {props.required ? <span className={'text-red'}> *</span> : ''}
                  </span>
                }
                onBlur={(): void => {
                  if (props.onSearch) props.onSearch('');
                }}
                placeholder={props.placeholder}
                ref={register?.ref}
              />

              {isMultiple && hasItems?.props?.children?.length > 0 ? (
                <TextField
                  InputProps={{ startAdornment }}
                  color={'hide'}
                  sx={{
                    width: '100%'
                  }}
                  variant={'filled'}
                />
              ) : null}
            </>
          );
        }}
        renderOption={(renderProps, option: SelectValues, state): ReactNode => (
          <li
            {...renderProps}
            style={{
              backgroundColor: state.selected ? colors.gray[700] : '',
              color: 'white',
              lineHeight: '2rem'
            }}
          >
            {option.label}
          </li>
        )}
        renderTags={(params, getTagProps): ReactNode => (
          <div
            className={'overflow-auto'}
            style={{
              maxHeight: props.tagsMaxHeight ?? '90px'
            }}
          >
            {params.map((option, index) => {
              const customOption = option as SelectValues;

              return (
                <Chip
                  {...getTagProps({ index })}
                  key={customOption.label}
                  deleteIcon={
                    <CloseIcon
                      sx={{
                        color: `${colors.gray[500]} !important`
                      }}
                    />
                  }
                  label={customOption.label}
                  sx={{
                    backgroundColor: `${colors.gray[150]} !important`,
                    borderRadius: '5px',
                    color: 'black !important',
                    fontWeight: '500'
                  }}
                />
              );
            })}
          </div>
        )}
        value={value}
      />

      <div
        className={'hidden'}
        id={`clear-select-${id}`}
        onClick={(): void => {
          const element = document.getElementById(`clear-indicator-${id}`) as HTMLElement;

          if (element) element?.click();

          if (props.onClear) props.onClear();
        }}
      />
    </>
  );
};
