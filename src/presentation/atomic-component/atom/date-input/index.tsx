import { Close } from '@mui/icons-material';
import { DatePicker as DatePickerMui } from '@mui/x-date-pickers';
import { IconButton } from '@mui/material';
import { formatDate } from 'main/utils';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (newDate: Date | null | undefined) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  label?: string;
  register?: UseFormRegisterReturn;
}

export const DateInput: FC<DatePickerProps> = ({
  onChange,
  error,
  register,
  placeholder,
  defaultValue,
  label,
  value,
  disabled
}) => {
  const [date, setDate] = useState<Date | null | undefined>(defaultValue ?? value ?? undefined);

  const formatDates = (): Date | null => {
    if (date) return `${formatDate(date, 'yyyy-MM-dd')}T00:00:00` as unknown as Date;

    return null;
  };

  useEffect(() => {
    if (onChange) onChange(formatDates());
  }, [date]);

  useEffect(() => {
    if (value === null) setDate(null);
  }, [value]);

  return (
    <div className={'flex flex-col w-full relative'}>
      <DatePickerMui
        {...register}
        defaultValue={defaultValue}
        disabled={disabled}
        label={label}
        localeText={{
          cancelButtonLabel: 'Cancelar',
          okButtonLabel: 'Salvar',
          toolbarTitle: 'Selecione a data'
        }}
        onChange={(selectedDate): void => {
          setDate(new Date(selectedDate as unknown as string));
        }}
        ref={register?.ref}
        slotProps={{
          textField: {
            error,
            placeholder
          }
        }}
        value={date}
        views={['day', 'month', 'year']}
      />

      {date && !disabled ? (
        <div className={'absolute top-2.5 right-4 tablet:right-10'}>
          <IconButton
            onClick={(): void => {
              setDate(null);
            }}
            sx={{
              padding: '5px'
            }}
          >
            <Close />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
