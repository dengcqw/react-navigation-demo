import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SettingsScreen = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;
// https://reactnavigation.org/docs/7.x/nesting-navigators
// navigation history options params 都是各自维护
// 子导航器继承父导航器的相关方法，可以直接调用
// 父导航器可以通过navigation.dispatch(DrawerActions.toggleDrawer()) 向子导航器发送方法
// 子导航器无法直接监听到父导航器事件，需要使用getParent
// const unsubscribe = navigation
//  .getParent('MyTabs')
//  .addListener('tabPress', (e) => {
//    alert('Tab pressed!');
//  });
// 打开子导航器页面需要特殊参数
// navigation.navigate('More', {
//  screen: 'Messages',
//  params: { user: 'jane' },
// })
// 嵌套导航导致双导航栏的处理 headerShown: false
export const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);
