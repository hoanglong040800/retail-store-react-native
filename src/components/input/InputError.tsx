/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  errors: FieldErrors<any> | FieldError;
  name: string;
};

const InputError = ({ name, errors }: Props) => {
  const renderError = useMemo((): string => {
    if (errors?.message) {
      return (errors?.message as string) || '';
    }

    return errors?.[name]?.message || '';
  }, [errors, name]);

  return (
    <Text variant="labelMedium" style={styles.text}>
      {renderError}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    height: 25,
  },
});

export default InputError;
