import { KeyboardEvent } from 'react';
import { Input, NXInputProps } from "./Input";
import { twMerge } from 'tailwind-merge';
import { Dropdown } from './Dropdown';

type Props = {
  fields: NXInputProps[];
  handleSubmit?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const FieldGroup = ({ fields, handleSubmit }: Props) => {
  // console.log(`🚀 => FieldGroup => fields:`, fields)
  return (
    <div className="flex flex-wrap -mx-2">
      {/* fields loop */}
      {fields.map((item, idx) => {
        return (
          <div key={idx} className={twMerge('field m-0 w-full grow px-2 ', item.fieldClassName || 'NONE')}>
            {/* label */}
            {item.label && !item.hideLabel && (
              <label className="text-lighten-4 text-xs" htmlFor={item.id || item.label}>
                {item.label}
              </label>
            )}
            {/* input switch */}
            <Field
              handleSubmit={handleSubmit}
              item={item}
            ></Field>
          </div>
        );
      })}
    </div>
  );
};






type FieldProps = {
  item: NXInputProps;
  handleSubmit?: (e: KeyboardEvent<HTMLInputElement>) => void;
};
export const Field = ({ item, handleSubmit }: FieldProps) => {
  // Input
  if (item.fieldType === 'Input') {
    item.value = item.value || '';
    return <Input handleSubmit={handleSubmit} {...item}></Input>;
  }
  
  // Dropdown
  if (item.fieldType === 'Dropdown') {
    return <Dropdown></Dropdown>;
  }

  // Missing Field
  return (
    <p className="f">Missing Field: {item.fieldType}</p>
  );
};

