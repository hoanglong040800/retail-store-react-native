import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { BottomButtonWrapper, DeTextInput } from 'components';
import { RegisterForm, registerSchema } from './_shared';

const resolvedRegisterSchema = yupResolver(object(registerSchema));

type Props = {
  onSubmit: (data: RegisterForm) => Promise<void>;
};

const RegisterContent = ({ onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: resolvedRegisterSchema });

  const handleSubmitFail = () => {};

  return (
    <View style={styles.container}>
      <DeTextInput control={control} errors={errors} name="firstName" label="First Name" />

      <DeTextInput control={control} errors={errors} name="lastName" label="Last Name" />

      <DeTextInput control={control} errors={errors} name="email" label="Email" />

      <DeTextInput control={control} errors={errors} name="password" label="Password" secureTextEntry />

      <DeTextInput control={control} errors={errors} name="confirmPassword" label="Confirm Password" secureTextEntry />

      {/* TODO move logic to save button on header */}
      <BottomButtonWrapper>
        <Button onPress={handleSubmit(onSubmit, handleSubmitFail)}>Register</Button>
      </BottomButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RegisterContent;
