/* eslint-disable react/no-array-index-key */
import { Add, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { LabelInput } from 'presentation/atomic-component/atom/label-input';
import { useDebounce } from 'data/hooks';
import { useState } from 'react';
import type { FC } from 'react';

interface ListInputProps {
  title: string;
  label: string;
  type?: 'number';
  onChange: (list: (number | string)[]) => void;
  initialList: (number | string)[];
}

export const ListInput: FC<ListInputProps> = ({ label, title, onChange, initialList, type }) => {
  const [listToRender, setListToRender] = useState<(number | string)[]>(initialList);
  const [tempList, setTempList] = useState<(number | string)[]>(initialList);

  const handleChange = (value: string, index: number): void => {
    const newValues = [...tempList];

    if (type === 'number') newValues[index] = Number(value);
    else newValues[index] = value;

    setTempList(newValues);
  };

  const handleDelete = (index: number): void => {
    const newValues = tempList.filter((_value, indexValue) => indexValue !== index);
    const newValues2 = listToRender.filter((_value, indexValue) => indexValue !== index);

    setTempList(newValues);
    setListToRender(newValues2);
  };

  useDebounce(
    () => {
      onChange(tempList);
    },
    [tempList],
    500
  );

  return (
    <div className={'bg-gray-800 w-full p-2'}>
      <div className={'flex justify-evenly items-center text-white h-min mb-3'}>
        <span>{title}</span>

        <IconButton
          color={'inherit'}
          onClick={(): void => {
            setTempList([...tempList, '']);
            setListToRender([...listToRender, '']);
          }}
        >
          <Add />
        </IconButton>
      </div>

      <div className={'flex flex-col gap-6 items-center'}>
        {listToRender?.map((_item, index) => (
          <div key={`value-${index}-${title}`} className={'w-full flex gap-3'}>
            <LabelInput
              label={label}
              onChange={(event) => handleChange(event.target.value, index)}
              type={type}
              value={String(tempList[index])}
            />

            <IconButton
              color={'inherit'}
              onClick={() => {
                handleDelete(index);
              }}
            >
              <Delete />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};
