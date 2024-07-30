import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabScreen } from './TopTabScreen';


function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.navigate('MyTask') } >Home Screen</Text>
    </View>
  );
}

type RootStackParamList = {
  MyTask: undefined
  Home: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// screenOption  和 options 都是 NativeStackNavigationOptions 类型
// screenOption : specify the same options for all of the screens in the navigator
// component 必须是组件不能是函数
function RootStack() {
  return (
    <Stack.Navigator
    initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
      <Stack.Screen name="MyTask" component={TabScreen} options={{ title: 'app_task' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

// first, we need to wrap your app in NavigationContainer
// NavigationContainer is a component that manages our navigation tree and contains the navigation state.
// createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator
// Both of them are React components used for configuring the navigator
