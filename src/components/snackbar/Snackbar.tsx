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

  const theme = useMemo<ThemeProp>(() => {
    let textColor: string = 'white';
    let backgroundColor: string = 'grey';

    switch (type) {
      case 'success':
        textColor = 'white';
        backgroundColor = 'lightgreen';
        break;

      case 'error':
        textColor = 'white';
        backgroundColor = 'lightcoral';
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
  }, [type]);

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
