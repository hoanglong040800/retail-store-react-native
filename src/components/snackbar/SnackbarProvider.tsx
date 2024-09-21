import { useReducer } from 'react';
import { createPortal } from 'react-dom';
import { TSnackbar } from 'types';
import { SnackbarDpCxt, snackbarReducer } from './SnackbarDispatchContext';
import Snackbar from './Snackbar';

const initialState: TSnackbar = {
  visible: false,
  title: '',
  type: 'success',
};

type Props = {
  children: JSX.Element;
};

const SnackbarProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  const handleDismiss = () => {
    dispatch({ type: 'close' });
  };

  return (
    <SnackbarDpCxt.Provider value={dispatch}>
      {children}

      <SnackbarPortal>
        <Snackbar visible={state.visible} title={state.title} onDismiss={handleDismiss} />
      </SnackbarPortal>
    </SnackbarDpCxt.Provider>
  );
};

// Used for render Snackbar in body so it can apply z-index -> render above modal
const SnackbarPortal = ({ children }) => {
  const snackbarRoot = document.createElement('div');
  document.body.appendChild(snackbarRoot);

  return createPortal(children, snackbarRoot);
};

export default SnackbarProvider;
