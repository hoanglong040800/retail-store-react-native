import { useForm } from 'react-hook-form';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { BottomButtonWrapper, DeTextInput } from 'components';
import { BASE_STYLE } from 'const';
import { RegisterForm, registerSchema } from './_shared';

const resolvedRegisterSchema = yupResolver(object(registerSchema));

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  onSubmit: (data: RegisterForm) => Promise<void>;
};

const RegisterContent = ({ containerStyle, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: resolvedRegisterSchema });

  return (
    <View style={[styles.container, containerStyle]}>
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
  container: BASE_STYLE.CONTAINER_WRAP_BOT_BTN,

  content: BASE_STYLE.SCROLL_VIEW_DEFAULT,
});

export default RegisterContent;
