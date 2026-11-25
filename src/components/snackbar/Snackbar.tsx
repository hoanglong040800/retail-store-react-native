import { useAppTheme } from 'hooks';
import { useMemo } from 'react';
import { Snackbar as PaperSnackbar } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { SnackbarType } from 'types';

type Props = {
  visible: boolean;
  title: string;
  type: SnackbarType;
  onDismiss: () => void;
};

const Snackbar = ({ visible, title, type, onDismiss }: Props) => {
  const DURATION = 5000;

  const { colors } = useAppTheme();

  const theme = useMemo<ThemeProp>(() => {
    let textColor = colors.inverseOnSurface;
    let backgroundColor = colors.inverseSurface;

    switch (type) {
      case 'success':
        textColor = colors.onSuccessContainer;
        backgroundColor = colors.successContainer;
        break;

      case 'error':
        textColor = colors.onErrorContainer;
        backgroundColor = colors.errorContainer;
        break;

      default:
        break;
    }

    return {
      colors: {
        inverseOnSurface: textColor,
        inverseSurface: backgroundColor,
      },
    };
  }, [type, colors]);

  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={DURATION}
      wrapperStyle={{
        // override Modal z-index
        zIndex: 9999,
      }}
      theme={theme}
    >
      {title}
    </PaperSnackbar>
  );
};

export default Snackbar;
