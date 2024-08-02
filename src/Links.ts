import { Linking } from 'react-native'

Linking.addEventListener('url', ({ url }) => {
  console.log('----> 接受到url： ', url)
})
