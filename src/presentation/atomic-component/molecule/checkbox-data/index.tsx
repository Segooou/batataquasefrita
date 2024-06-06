import { Checkbox, FormControlLabel } from '@mui/material';
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react';
import type { InputProps } from 'domain/models';

interface InputDataProps {
  inputData: InputProps;
  index: number;
  data: InputProps[];
  setData: Dispatch<SetStateAction<InputProps[]>>;
}

export const CheckboxData: FC<InputDataProps> = ({
  inputData: { id, colSpan, options },
  index,
  data,
  setData
}) => {
  useEffect((): void => {
    if (!data?.[index]?.value || data?.[index]?.value?.length === 0) {
      const newData = [...data];

      newData[index] = { ...newData[index], value: options?.[0].id };

      setData(newData);
    }
  }, [data?.[index]?.value]);

  return (
    <div
      className={`flex w-full flex-wrap items-center justify-center ${colSpan ? 'col-span-2' : ''}`}
    >
      {options?.map((item) => (
        <FormControlLabel
          key={item.id}
          control={
            <Checkbox
              checked={item.id === data?.[index]?.value}
              defaultChecked={item.id === data?.[index]?.value}
              onChange={(): void => {
                const newData = [...data];

                newData[index] = { ...newData[index], value: item.id };

                setData(newData);
              }}
            />
          }
          id={`input-data-${id}`}
          label={item.name}
          labelPlacement={'start'}
        />
      ))}
    </div>
  );
};
