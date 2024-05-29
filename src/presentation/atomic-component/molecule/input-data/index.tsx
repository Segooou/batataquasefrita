import { LabelInput } from 'presentation/atomic-component/atom';
import type { Dispatch, FC, SetStateAction } from 'react';
import type { InputProps } from 'domain/models';
import type { validateFormProps } from 'main/utils';

interface InputDataProps {
  inputData: InputProps;
  index: number;
  data: InputProps[];
  validateForm: (data: validateFormProps) => unknown | false;
  setData: Dispatch<SetStateAction<InputProps[]>>;
}

export const InputData: FC<InputDataProps> = ({
  inputData: { error, id, label, value, type, mask, isRequired, placeholder, colSpan, uppercase },
  index,
  validateForm,
  data,
  setData
}) => {
  return (
    <div className={`flex flex-col w-full ${colSpan ? 'col-span-2' : ''}`}>
      <LabelInput
        error={error}
        id={`input-data-${id}`}
        label={label}
        mask={mask ?? undefined}
        onChange={(event): void => {
          const newData = [...data];

          newData[index] = { ...newData[index], value: event.target.value };

          setData(newData);
        }}
        onFocusOut={(): void => {
          if (error) validateForm({ data, index, setData });
        }}
        placeholder={placeholder}
        required={isRequired}
        type={type}
        uppercase={uppercase}
        value={value ?? ''}
      />
    </div>
  );
};
