import { Close } from '@mui/icons-material';
import { DateRange } from 'react-date-range';
import { DateRangeIcon } from '@mui/x-date-pickers';
import { IconButton } from '@mui/material';
import { SimpleMenu } from 'presentation/atomic-component/atom/simple-menu';
import { formatDate } from 'main/utils';
import { pt } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface DateProps {
  endDate: Date;
  startDate: Date;
  first?: boolean;
}

interface DatePickerProps {
  value?: DateProps[];
  defaultValue?: DateProps[];
  onChange?: (newDate: DateProps | null) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  register?: UseFormRegisterReturn;
}

export const DateRangeInput: FC<DatePickerProps> = ({
  onChange,
  error,
  register,
  defaultValue,
  label,
  value,
  disabled
}) => {
  const [date, setDate] = useState<DateProps[]>(defaultValue || []);

  const formatDates = (dateToFormat: Date, isEnd?: boolean): Date => {
    return `${formatDate(dateToFormat, 'yyyy-MM-dd')}${isEnd ? 'T23:59:59' : 'T00:00:00'}` as unknown as Date;
  };

  useEffect(() => {
    if (onChange)
      if (date.length && !date[0].first)
        onChange({
          endDate: formatDates(date[0].endDate, true),
          startDate: formatDates(date[0].startDate)
        });
      else onChange(null);
  }, [date]);

  useEffect(() => {
    setDate(value ?? []);
  }, [value]);

  const [open, setOpen] = useState(false);

  return (
    <div className={'w-full'}>
      <SimpleMenu
        isOpen={open}
        openElement={
          <div
            className={`flex w-full cursor-pointer items-center justify-between pl-3 border rounded-sm min-h-[51px] ${error ? 'border-red' : 'border-gray-350'}`}
            onClick={(): void => {
              if (!disabled)
                if (date.length === 0)
                  setDate([
                    {
                      endDate: new Date(),
                      first: true,
                      startDate: new Date()
                    }
                  ]);
            }}
          >
            <div>
              {date.length === 0 || (date.length && date[0].first) ? (
                <span className={'text-gray-550'}>{label}</span>
              ) : (
                `${formatDate(date[0].startDate)} - ${formatDate(date[0].endDate)}`
              )}
            </div>

            <div>
              {date.length > 0 && !date[0].first ? (
                <IconButton
                  onClick={(event): void => {
                    event.stopPropagation();
                    if (!disabled) setDate([]);
                    setOpen(false);
                  }}
                  sx={{
                    zIndex: '50'
                  }}
                >
                  <Close color={error ? 'error' : undefined} />
                </IconButton>
              ) : null}

              <IconButton>
                <DateRangeIcon color={error ? 'error' : undefined} />
              </IconButton>
            </div>
          </div>
        }
        side={'bottom'}
      >
        <DateRange
          {...register}
          locale={pt}
          onChange={(ranges): void => {
            const { range1 } = ranges as unknown as {
              range1: {
                endDate: Date;
                startDate: Date;
              };
            };

            if (range1) setDate([{ ...range1, first: false }]);
          }}
          ranges={date}
          ref={register?.ref}
        />
      </SimpleMenu>
    </div>
  );
};
