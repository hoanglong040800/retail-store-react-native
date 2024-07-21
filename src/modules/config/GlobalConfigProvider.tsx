import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { getGlobalConfig } from 'service';
import { GetGlobalConfigDto } from 'types';

export const GlobalConfigCxt = createContext<GetGlobalConfigDto>({
  categories: [],
});

type Props = {
  children: JSX.Element;
};

const GlobalConfigProvider = ({ children }: Props) => {
  // TODO cache in async storage
  const { data, isLoading } = useQuery<GetGlobalConfigDto, null, GetGlobalConfigDto>({
    queryKey: [],
    queryFn: () => getGlobalConfig(),
  });

  if (!data || isLoading) {
    return <ActivityIndicator animating />;
  }

  return <GlobalConfigCxt.Provider value={data}>{children}</GlobalConfigCxt.Provider>;
};

export default GlobalConfigProvider;

export const useGlobalConfig = () => useContext(GlobalConfigCxt);
