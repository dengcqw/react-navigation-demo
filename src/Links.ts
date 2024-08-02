import { Linking } from 'react-native'
import { LinkingOptions } from '@react-navigation/native';

Linking.addEventListener('url', ({ url }) => {
  console.log('----> 接受到url： ', url)
})


// 参考 https://reactnavigation.org/docs/configuring-links
// 定义页面路由
// config的嵌套要和导航器一直
export const linking = (): LinkingOptions => {
  return {
    prefixes: [
      'pagerouter://',
      'http://127.0.0.1'
    ],
    filter: (url) => !url.startWiths('pagerouter'),
    config: {
      screens: {
        MyTask: {
          screens: {
            Home: 'mytask/home',
            Settings: 'mytask/settings'
          }
        },
        Home: 'home',
        Detail: 'detail',
        BottomTab: {
          screens: {
            Home: 'bottomtab/home',
            Settings: 'bottomtab/settings'
          }
        },
        Edit: 'Edit'
      }
    }
  }
}
