// https://github.com/expo/expo/issues/23104#issuecomment-1689566248
import '@expo/metro-runtime';
import { NavigationContainer } from '@react-navigation/native';
import * as BeVietnamPro from '@expo-google-fonts/be-vietnam-pro';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'components';
import { ENV, FONT_FAMILY, LIGHT_THEME } from 'const';
import { GlobalConfigProvider } from 'modules';
import { Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { AppNavigator } from 'screens';

const queryClient = new QueryClient();
const stripePromise = loadStripe(ENV.STRIPE.PUBLIC_KEY, {
  locale: 'auto',
});

// Add suspense to avoid error with async recoil. github.com/facebook/react/issues/25629
const App = () => {
  const [fontsLoaded] = BeVietnamPro.useFonts({
    [FONT_FAMILY.regular]: BeVietnamPro.BeVietnamPro_400Regular,
    [FONT_FAMILY.medium]: BeVietnamPro.BeVietnamPro_500Medium,
    [FONT_FAMILY.semibold]: BeVietnamPro.BeVietnamPro_600SemiBold,
    [FONT_FAMILY.bold]: BeVietnamPro.BeVietnamPro_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <PaperProvider theme={LIGHT_THEME}>
            <Suspense fallback={<ActivityIndicator />}>
              <SnackbarProvider>
                <GlobalConfigProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <NavigationContainer>
                      <Elements stripe={stripePromise}>
                        <AppNavigator />
                      </Elements>
                    </NavigationContainer>
                  </GestureHandlerRootView>
                </GlobalConfigProvider>
              </SnackbarProvider>
            </Suspense>
          </PaperProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
