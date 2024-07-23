import { useCallback, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { getGlobalConfig } from 'service';
import { globalConfigState } from 'states';
import { getStorageItem, setStorageItems } from 'utils';

type Props = {
  children: JSX.Element;
};

const GlobalConfigProvider = ({ children }: Props) => {
  const [globalConfig, setGlobalConfig] = useRecoilState(globalConfigState);

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
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!globalConfig) {
      initGlobalConfig();
    }
  }, [globalConfig, initGlobalConfig]);

  if (!globalConfig) {
    return <ActivityIndicator />;
  }

  return children;
};

export default GlobalConfigProvider;
