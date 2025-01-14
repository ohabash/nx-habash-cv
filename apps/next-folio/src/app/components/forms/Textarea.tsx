import { HTMLInputTypeAttribute, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';

export type NXInputProps = {
  value?: string | readonly string[] | number | undefined | null;
  label: string;
  type?: HTMLInputTypeAttribute | undefined;
  id?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
  handleSubmit?: (e: KeyboardEvent<HTMLInputElement>) => void;
  pattern?: string;
  className?: string | undefined;
  rows?: number | undefined;
  fieldClassName?: string | undefined;
  hideLabel?: boolean;
  fieldType?: 'Input' | 'Dropdown' | 'Textarea';
};

export const Textarea = ({
  value = "",
  onChange = () => {},
  handleSubmit = () => {},
  pattern,
  placeholder,
  label,
  id,
  type,
  className,
  fieldClassName,
  hideLabel,
  rows
}: NXInputProps) => {
  return (
    <>
      <textarea
        // type={type || 'text'}
        id={id || label}
        placeholder={placeholder || label}
        value={value as any}
        onChange={e => onChange(e.target.value)}
        className={twMerge('input h-auto', className)}
        rows={rows || 4}
        // pattern={pattern}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e as any);
        }}
      />
    </>
  );
};

