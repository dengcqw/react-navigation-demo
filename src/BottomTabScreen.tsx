import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { RootStackParamList, BottomTabParamsList } from './RootStackParamList'
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// 直接依赖的库，需要显示安装
import type { StackScreenProps } from '@react-navigation/stack';

// 定义嵌套的navigator的页面参数
type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamsList, 'Home'>,
  StackScreenProps<RootStackParamList>
>;

function HomeScreen({route, navigation}: HomeScreenProps) {
  // stack 导航方法
  //navigation.push()
  // tab 导航方法
  //navigation.jumpTo()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'cellular-outline'
              : 'cellular';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cart-outline' : 'cart';
          }

          //console.log('----> msg', iconName)
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
