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
  onChange: (list: string[][]) => void;
  initialList: string[][];
}

export const ListListInput: FC<ListInputProps> = ({ label, title, onChange, initialList }) => {
  const [listToRender, setListToRender] = useState<string[][]>(initialList);
  const [tempList, setTempList] = useState<string[][]>(initialList);

  const handleChange1 = (value: string, index: number): void => {
    const newValues = [...tempList];

    newValues[index] = [value, newValues[index][1]];

    setTempList(newValues);
  };

  const handleChange2 = (value: string, index: number): void => {
    const newValues = [...tempList];

    newValues[index] = [newValues[index][0], value];

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
            setTempList([...tempList, ['', '']]);
            setListToRender([...listToRender, ['', '']]);
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
              onChange={(event) => handleChange1(event.target.value, index)}
              value={String(tempList[index][0])}
            />

            <LabelInput
              label={label}
              onChange={(event) => handleChange2(event.target.value, index)}
              value={String(tempList[index][1])}
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
