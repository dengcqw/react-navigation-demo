import React from 'react';
import { View, Text, Pressable, StatusBar, BackHandler } from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabScreen } from './TopTabScreen';
import BottomTabScreen from './BottomTabScreen'

import { Button } from '@react-navigation/elements';

import { EditTextScreen } from './EditScreen'

// render it only when the screen is focused
function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Text onPress={() => navigation.navigate('Details')} >Home Screen</Text>
      <View style={{ height: 20 }} />
      <Text onPress={() => navigation.navigate('BottomTab')} >Bottom Tab</Text>
      <View style={{ height: 20 }} />
      <Text onPress={() => navigation.navigate('Edit')} >Edit</Text>
      <View style={{ height: 20 }} />
      <Button onPress={() => navigation.navigate('MyModal')}>Open Modal</Button>
    </View>
  );
}

function DetailsScreen({ route }) {
  const navigation = useNavigation()
  const { itemId } = route.params ?? {}
  const [count, setCount] = React.useState(0);
  console.log('---->params', route.params)

  // 自定义android返回处理
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // return true; 已处理
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('ProfileScreen focused');
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('ProfileScreen blurred');
    });

    return unsubscribe;
  }, [navigation]);

  // or useIsFocused
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('ProfileScreen focus effect');

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('ProfileScreen focus effect cleanup');
      };
    }, [])
  );

  React.useEffect(() => {
    if (itemId === 0) {
      navigation.setParams({ itemId: 100 })
      navigation.setOptions({
        headerRight: () => (
          <Text onPress={() => setCount((c) => c + 1)}>Update count</Text>
        ),
      });
    }
  }, [itemId, navigation])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text onPress={() => {
        navigation.push('Details', { itemId: 86 })
      }}>
        Go to Details... again
      </Text>
      <View style={{ height: 20 }} />
      <Text onPress={() => navigation.popTo('Details', { popitemId: 0 })}>Go back</Text>
    </View>
  );
}

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
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

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
