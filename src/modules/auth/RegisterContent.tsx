import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { BottomButtonWrapper, DeTextInput } from 'components';
import { CONTAINER_WRAP_BOT_BTN } from 'const';
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <DeTextInput control={control} errors={errors} name="firstName" label="First Name" />

        <DeTextInput control={control} errors={errors} name="lastName" label="Last Name" />

        <DeTextInput control={control} errors={errors} name="email" label="Email" />

        <DeTextInput control={control} errors={errors} name="password" label="Password" secureTextEntry />

        <DeTextInput
          control={control}
          errors={errors}
          name="confirmPassword"
          label="Confirm Password"
          secureTextEntry
        />
      </ScrollView>

      <BottomButtonWrapper>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Register
        </Button>
      </BottomButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: CONTAINER_WRAP_BOT_BTN,

  content: {
    flex: 1,
    padding: 16,
  },
});

export default RegisterContent;
