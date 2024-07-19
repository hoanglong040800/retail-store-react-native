import { Snackbar as PaperSnackbar } from 'react-native-paper';

type Props = {
  visible: boolean;
  title: string;
  onDismiss: () => void;
};

const Snackbar = ({ visible, title, onDismiss }: Props) => {
  const DURATION = 5000;

  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={DURATION}
      wrapperStyle={{
        // override Modal z-index
        zIndex: 9999,
      }}
    >
      {title}
    </PaperSnackbar>
  );
};

export default Snackbar;
