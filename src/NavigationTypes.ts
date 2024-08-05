import { NavigatorScreenParams } from '@react-navigation/native';

import type { RootStackParamList, BottomTabParamsList } from './RootStackParamList'
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// 直接依赖的库，需要显示安装
import type { StackScreenProps } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

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

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

export type BottomTabScreenProps<T extends keyof BottomTabParamsList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamsList, T>,
  StackScreenProps<RootStackParamList>
>;

export type TopTabScreenProps<T extends keyof TopTabParamsList> = CompositeScreenProps<
  BottomTabScreenProps<TopTabParamsList, T>,
  StackScreenProps<RootStackParamList>
>;


// 全局默认的导航类型定义
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
