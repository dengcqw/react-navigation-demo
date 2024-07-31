import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import Animated from 'react-native-reanimated';
import {FocusAwareStatusBar} from './components/FocusAwareStatusBar'


export function HomeScreen() {
  const navigation = useNavigation()
  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Text onPress={() => navigation.openDrawer()}>Drawer</Text>
      ),
    })
  }, [navigation])

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
      <Animated.Image
        source={{ uri: 'https://picsum.photos/id/39/200' }}
        style={{ width: 300, height: 300 }}
        sharedTransitionTag="tag"
      />
    </View>
  );
}
