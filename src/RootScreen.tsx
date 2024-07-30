import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabScreen} from './TopTabScreen';

type RootStackParamList = {
  MyTask: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function MyTabs() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="MyTask" component={TabScreen} options={{title: 'app_task'}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
