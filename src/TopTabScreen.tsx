import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SettingsScreen = () => <View style={{flex: 1, backgroundColor: '#673ab7'}} />;

export const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

