
import { WebView, Text } from 'react-native'

export function NotFoundScreen({ route }) {
  if (route.path) {
    return <WebView source={{ uri: `https://mywebsite.com/${route.path}` }} />;
  }

  return <Text>This screen doesn't exist!</Text>;
}
