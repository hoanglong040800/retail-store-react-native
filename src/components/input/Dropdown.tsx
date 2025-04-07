import { Controller, useFormContext } from 'react-hook-form';
import { Dropdown as LibraryDropdown, Option } from 'react-native-paper-dropdown';

type Props<T> = {
  name: keyof T;
  label: string;
  placeholder?: string;
  options: Option[];
};

const Dropdown = <T extends object>({ name, label, placeholder, options }: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <LibraryDropdown
            label={label}
            placeholder={placeholder}
            options={options || []}
            value={value}
            onSelect={val => onChange(val)}
          />
        );
      }}
    />
  );
};

export default Dropdown;
