// https://github.com/expo/expo/issues/23104#issuecomment-1689566248
import '@expo/metro-runtime';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'components';
import { THEME } from 'const';
import { GlobalConfigProvider } from 'modules';
import { Suspense } from 'react';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { AppNavigator } from 'screens';

const queryClient = new QueryClient();

// Add suspense to avoid error with async recoil. github.com/facebook/react/issues/25629
const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <PaperProvider theme={THEME}>
            <Suspense fallback={<ActivityIndicator />}>
              <GlobalConfigProvider>
                <SnackbarProvider>
                  <NavigationContainer>
                    <AppNavigator />
                  </NavigationContainer>
                </SnackbarProvider>
              </GlobalConfigProvider>
            </Suspense>
          </PaperProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
