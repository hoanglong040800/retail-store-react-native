import { useQuery } from '@tanstack/react-query';
import { getHomeData } from 'service';
import { GetHomeDataDto } from 'types/dto/home.dto';

export const useHomeScreen = () => {
  const { data: homeData, isLoading: isLoadingHomeData } = useQuery<GetHomeDataDto, null, GetHomeDataDto>({
    queryKey: ['homeData'],
    queryFn: getHomeData,
  });

  return {
    homeData,
    isLoadingHomeData,
  };
};
