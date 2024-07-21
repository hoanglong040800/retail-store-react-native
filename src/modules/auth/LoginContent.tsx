import { yupResolver } from '@hookform/resolvers/yup';
import { StyleProp, ViewStyle } from 'react-native';
import { object } from 'yup';
import { useForm } from 'react-hook-form';
import { DeTextInput, ModalLayout } from 'components';
import { LoginForm, loginSchema } from './_shared';

const resolvedLoginSchema = yupResolver(object(loginSchema));

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  onSubmit: (data: LoginForm) => Promise<void>;
};

const LoginContent = ({ containerStyle, onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({ resolver: resolvedLoginSchema });

  return (
    <ModalLayout containerStyle={containerStyle} bottomButton={{ text: 'Login', onPress: handleSubmit(onSubmit) }}>
      <DeTextInput control={control} errors={errors} name="email" label="Email" />

      <DeTextInput control={control} errors={errors} name="password" label="Password" secureTextEntry />
    </ModalLayout>
  );
};

export default LoginContent;
