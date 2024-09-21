import { useSnackbar } from 'components';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { getGlobalConfig } from 'service';
import { globalConfigState } from 'states';
import { ErrorResponse } from 'types';
import { getStorageItem, setStorageItems } from 'utils';
import { subscribeEvent } from 'utils/event.util';

type Props = {
  children: JSX.Element;
};

const GlobalConfigProvider = ({ children }: Props) => {
  const [globalConfig, setGlobalConfig] = useRecoilState(globalConfigState);

  const { openSnackbar } = useSnackbar();

  // ------- FUNCTIONS ---------

  const initGlobalConfig = useCallback(async () => {
    try {
      const storageGlobalConfig = await getStorageItem('globalConfig');

      if (storageGlobalConfig) {
        setGlobalConfig(storageGlobalConfig);
        return;
      }

      const fetchGlobalConfig = await getGlobalConfig();

      await setStorageItems({
        globalConfig: fetchGlobalConfig,
      });

      setGlobalConfig(fetchGlobalConfig);
    } catch (error) {
      throw new Error(error);
    }
  }, [setGlobalConfig]);

  const showSnackbarErrorListener = (customEvent: CustomEvent<ErrorResponse>) => {
    openSnackbar('error', customEvent.detail.message);
  };

  // -------- EFFECT ----------

  useEffect(() => {
    if (!globalConfig) {
      initGlobalConfig();
    }
  }, [globalConfig, initGlobalConfig]);

  // https://blog.logrocket.com/using-custom-events-react/#custom-events-react
  useEffect(() => {
    subscribeEvent('show snackbar error', showSnackbarErrorListener);

    // only need to run first time to subscribe event
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!globalConfig) {
    return <ActivityIndicator />;
  }

  return children;
};

export default GlobalConfigProvider;
