import { SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

type Props = {
  children: ReactNode;
};

const BottomButtonWrapper = ({ children }: Props) => {
  const { colors } = useAppTheme();

  return (
    <Surface
      elevation={2}
      style={[styles.container, { backgroundColor: colors.elevation.level2, borderTopColor: colors.outlineVariant }]}
    >
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingVertical: SPACE.sm,
    paddingHorizontal: SPACE.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default BottomButtonWrapper;
