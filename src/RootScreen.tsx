import React from 'react';
import { View, Text, Pressable, StatusBar } from 'react-native';

import { Button } from '@react-navigation/elements';
import { NavigationContainer, useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabScreen } from './TopTabScreen';
import BottomTabScreen from './BottomTabScreen'
import { LeftDrawerScreen, RightDrawerScreen} from './DrawerStack'
import { EditTextScreen } from './EditScreen'
import {HomeScreen} from './HomeScreen'
import {DetailsScreen} from './DetailScreen'

import { navigationRef } from './RootNavigation'

import Animated from 'react-native-reanimated';
import './Links'

function ModalScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000AA' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()}>Dismiss</Button>
    </View>
  );
}

type RootStackParamList = {
  MyTask: undefined
  Home: undefined
  Detail: { itemId: number }
  BottomTab: undefined
  Edit: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// screenOption  和 options 都是 NativeStackNavigationOptions 类型
// screenOption : specify the same options for all of the screens in the navigator
// component 必须是组件不能是函数
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        header: undefined,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Edit" component={EditTextScreen} options={{ title: 'Edit' }} />
      <Stack.Screen name="BottomTab" component={BottomTabScreen} options={{ title: 'BottomTab' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} initialParams={{ itemId: 0 }} />
      <Stack.Screen name="MyTask" component={TabScreen} options={{ title: 'app_task', animation: 'slide_from_bottom' }} />
      <Stack.Group screenOptions={{ presentation: 'transparentModal' }}>
        <Stack.Screen name="MyModal" component={ModalScreen} options={{headerShown: false}} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}

// 配置 reanimated
// https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation
// 需要手动安装，不然rn无法发现这个模块
// 修改后需要清缓存运行： npm start -- --reset-cache
//
// first, we need to wrap your app in NavigationContainer
// NavigationContainer is a component that manages our navigation tree and contains the navigation state.
// createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator
// Both of them are React components used for configuring the navigator
//
// navigate 会检测堆栈中是不是有一个同类的页面， push 每次开启新页面
// navigation.navigate('RouteName')
// navigation.push('RouteName')
//
// open screen with params
// read params from route
// initialParams
// navigation.setParams
//
// 回传参数，避免使用相同参数名导致参数覆盖
// navigation.popTo
//
// 嵌套导航传参，如嵌套了TabBar
// https://reactnavigation.org/docs/7.x/nesting-navigators
// navigation.navigate('More', {
//  screen: 'Settings',
//  params: { user: 'jane' },
// })
//
// Modal screen
// 只定义在最顶层stack
// Modal 上不能push 一般页面，只能push Modal
//
// 可以在原生项目中添加schema的工具, 下面添加了mychat做为schema
// npx uri-scheme add mychat --android
// 测试命令
// npx uri-scheme open "mychat://chat/jane" --ios
// xcrun simctl openurl booted "mychat://chat/jane"
// adb shell am start -W -a android.intent.action.VIEW -d "mychat://chat/jane" com.simpleapp
//
// navigate 如果用于跳转到已经打开的页面会改变页面参数, 要使用版本7 中的popTo方法
// 或成route中获取params
// this.navigator.navigate(route.name, route.params)
