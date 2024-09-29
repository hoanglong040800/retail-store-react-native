import { StyleSheet } from 'react-native';
import { Surface, SurfaceProps } from 'react-native-paper';

type Props = SurfaceProps;

const DeSurface = ({ children, style, ...rest }: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Surface style={[styles.surface, style]} {...rest}>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});

export default DeSurface;
