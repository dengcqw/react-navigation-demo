import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamsList = {
  Home: undefined
  Setting: undefined
}

export type TopTabParamsList = {
  Home: undefined
  Setting: undefined
}

export type RootStackParamList = {
  MyTask: NavigatorScreenParams<TopTabParamsList>
  Home: undefined
  Detail: { itemId: number }
  BottomTab: NavigatorScreenParams<BottomTabParamsList>
  Edit: undefined
};
