import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

const LoginContent = ({ containerStyle }: Props) => {
  return (
    <View style={containerStyle}>
      <Text>Login Content</Text>
    </View>
  );
};

export default LoginContent;
