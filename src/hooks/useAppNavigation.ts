import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { ParamsType, Screen } from 'types';

export const useAppNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navigate = (screen: Screen, params?: ParamsType) => {
    const action = CommonActions.navigate(screen, params);

    navigation.dispatch(action);
  };

  const goBack = () => navigation.goBack();

  return { route, navigate, goBack };
};
