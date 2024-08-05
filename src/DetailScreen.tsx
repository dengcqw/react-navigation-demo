import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { NavigationContainer, useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';

import { Button } from '@react-navigation/elements';
import Animated from 'react-native-reanimated';
import {FocusAwareStatusBar} from './components/FocusAwareStatusBar'

import type { RootStackScreenProps } from './NavigationTypes'

export function DetailsScreen({ route, navigation }: RootStackScreenProps<'Detail'>) {
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
      <Animated.Image
        source={{ uri: 'https://picsum.photos/id/39/200' }}
        style={{ width: 100, height: 100 }}
        sharedTransitionTag="tag"
      />
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
