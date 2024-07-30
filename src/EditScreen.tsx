import React from 'react';
import { View, TextInput, Platform, Alert } from 'react-native';
import { useNavigation, usePreventRemove } from '@react-navigation/native';

export const EditTextScreen = () => {
  const navigation = useNavigation();
  const [text, setText] = React.useState('');

  const hasUnsavedChanges = Boolean(text);

  // 阻止用户离开屏幕
  usePreventRemove(hasUnsavedChanges, ({ data }) => {
    if (Platform.OS === 'web') {
      // Alert is not supported on web, so we can use confirm
      //const discard = confirm(
        //'You have unsaved changes. Discard them and leave the screen?'
      //);

      //if (discard) {
        //navigation.dispatch(data.action);
      //}
    } else {
      // Prompt the user before leaving the screen
      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Discard them and leave the screen?',
        [
          {
            text: "Don't leave",
            style: 'cancel',
            onPress: () => {
              // Do nothingP
            },
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(data.action),
          },
        ]
      );
    }
  });

  return (
    <View >
      <TextInput
        autoFocus
        value={text}
        placeholder="Type something…"
        onChangeText={setText}
      />
    </View>
  );
};
